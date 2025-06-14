from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="ZigZag Platform API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Startup Idea Models
class LeanCanvas(BaseModel):
    problems: List[str] = []
    solutions: List[str] = []
    customers: List[str] = []
    competitors: List[str] = []
    valueProposition: str = ""
    channels: List[str] = []
    revenue: List[str] = []
    keyMetrics: List[str] = []

class Hypothesis(BaseModel):
    type: str  # Desirability, Viability, Feasibility
    text: str
    criticality: str  # High, Medium, Low
    method: str

class Storytelling(BaseModel):
    names: List[str] = []
    mission: str = ""
    vision: str = ""
    values: List[str] = []
    elevatorPitch: str = ""

class StartupIdea(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    industry: str
    leanCanvas: LeanCanvas
    hypotheses: List[Hypothesis] = []
    storytelling: Storytelling
    created: datetime = Field(default_factory=datetime.utcnow)
    updated: datetime = Field(default_factory=datetime.utcnow)
    userId: Optional[str] = None

class StartupIdeaCreate(BaseModel):
    name: str
    description: str
    industry: str
    leanCanvas: LeanCanvas
    hypotheses: List[Hypothesis] = []
    storytelling: Storytelling
    userId: Optional[str] = None

class StartupIdeaUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    leanCanvas: Optional[LeanCanvas] = None
    hypotheses: Optional[List[Hypothesis]] = None
    storytelling: Optional[Storytelling] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "ZigZag Platform API v1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Startup Ideas CRUD Operations
@api_router.post("/startup-ideas", response_model=StartupIdea)
async def create_startup_idea(idea: StartupIdeaCreate):
    """Create a new startup idea"""
    idea_dict = idea.dict()
    startup_idea = StartupIdea(**idea_dict)
    
    # Insert into MongoDB
    result = await db.startup_ideas.insert_one(startup_idea.dict())
    if result.inserted_id:
        return startup_idea
    else:
        raise HTTPException(status_code=500, detail="Failed to create startup idea")

@api_router.get("/startup-ideas", response_model=List[StartupIdea])
async def get_startup_ideas(userId: Optional[str] = None):
    """Get all startup ideas, optionally filtered by userId"""
    query = {}
    if userId:
        query["userId"] = userId
    
    ideas = await db.startup_ideas.find(query).to_list(1000)
    return [StartupIdea(**idea) for idea in ideas]

@api_router.get("/startup-ideas/{idea_id}", response_model=StartupIdea)
async def get_startup_idea(idea_id: str):
    """Get a specific startup idea by ID"""
    idea = await db.startup_ideas.find_one({"id": idea_id})
    if idea:
        return StartupIdea(**idea)
    else:
        raise HTTPException(status_code=404, detail="Startup idea not found")

@api_router.put("/startup-ideas/{idea_id}", response_model=StartupIdea)
async def update_startup_idea(idea_id: str, update_data: StartupIdeaUpdate):
    """Update a startup idea"""
    # Get existing idea
    existing_idea = await db.startup_ideas.find_one({"id": idea_id})
    if not existing_idea:
        raise HTTPException(status_code=404, detail="Startup idea not found")
    
    # Update only provided fields
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated"] = datetime.utcnow()
    
    # Update in MongoDB
    result = await db.startup_ideas.update_one(
        {"id": idea_id},
        {"$set": update_dict}
    )
    
    if result.modified_count > 0:
        # Return updated idea
        updated_idea = await db.startup_ideas.find_one({"id": idea_id})
        return StartupIdea(**updated_idea)
    else:
        raise HTTPException(status_code=500, detail="Failed to update startup idea")

@api_router.delete("/startup-ideas/{idea_id}")
async def delete_startup_idea(idea_id: str):
    """Delete a startup idea"""
    result = await db.startup_ideas.delete_one({"id": idea_id})
    if result.deleted_count > 0:
        return {"message": "Startup idea deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Startup idea not found")

# AI Content Generation endpoint
@api_router.post("/generate-startup-content")
async def generate_startup_content(request: Dict[str, Any]):
    """Generate comprehensive startup content based on idea description"""
    description = request.get("description", "")
    
    if not description:
        raise HTTPException(status_code=400, detail="Description is required")
    
    # This will be enhanced with real AI integration later
    # For now, using the existing logic from frontend
    idea_lower = description.lower()
    
    # Industry detection logic
    industry = "general_tech"
    if any(word in idea_lower for word in ['food', 'restaurant', 'delivery']):
        industry = 'food_tech'
    elif any(word in idea_lower for word in ['fitness', 'health', 'wellness']):
        industry = 'health_tech'
    elif any(word in idea_lower for word in ['education', 'learning', 'course']):
        industry = 'ed_tech'
    elif any(word in idea_lower for word in ['finance', 'payment', 'banking']):
        industry = 'fin_tech'
    elif any(word in idea_lower for word in ['trade', 'trading', 'investment']):
        industry = 'trading'
    elif any(word in idea_lower for word in ['ai', 'artificial intelligence', 'machine learning']):
        industry = 'ai_tech'
    
    # Industry-specific data (example with trading)
    if industry == 'trading':
        content = {
            "industry": industry,
            "name": "TradeHive",
            "leanCanvas": {
                "problems": [
                    "Difficulty making informed trading decisions",
                    "Lack of transparency in financial markets",
                    "High barriers to entry for new investors"
                ],
                "solutions": [
                    "Social trading platform",
                    "Real-time market insights",
                    "Copy-trading features"
                ],
                "customers": [
                    "Millennial investors",
                    "Retirement planners",
                    "Day traders",
                    "Financial enthusiast students"
                ],
                "competitors": [
                    "eToro", "Robinhood", "TradingView", "Interactive Brokers",
                    "TD Ameritrade", "ZuluTrade", "CopyMe", "NAGA"
                ],
                "valueProposition": "Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.",
                "channels": [
                    "Mobile app",
                    "Financial blogs",
                    "Social media",
                    "Trading forums and communities"
                ],
                "revenue": [
                    "Trading commissions",
                    "Premium subscriptions",
                    "Copy-trading fees",
                    "Advertisement revenue from financial services"
                ],
                "keyMetrics": [
                    "Active traders",
                    "Trading volume",
                    "Platform assets",
                    "User retention rates",
                    "Social engagement"
                ]
            },
            "hypotheses": [
                {
                    "type": "Desirability",
                    "text": "Traders want to share and copy successful trading strategies",
                    "criticality": "High",
                    "method": "Trading community survey"
                },
                {
                    "type": "Viability",
                    "text": "Users will pay for premium trading insights and tools",
                    "criticality": "High",
                    "method": "Freemium conversion test"
                },
                {
                    "type": "Feasibility",
                    "text": "Real-time data feeds can be integrated cost-effectively",
                    "criticality": "High",
                    "method": "Technical feasibility study"
                }
            ],
            "storytelling": {
                "names": ["TradeHive", "InvestorHub", "TradingEdge", "MarketMaster", "FinanceFlow"],
                "mission": "Democratize trading by creating a collaborative platform where investors can learn, share, and grow together.",
                "vision": "To build the largest community of transparent, collaborative traders who empower each other to achieve financial success.",
                "values": [
                    "Transparency: Open sharing of trading strategies and results",
                    "Education: Helping traders learn and improve",
                    "Community: Building supportive trading relationships"
                ],
                "elevatorPitch": "Did you know that traders and investors struggle to find a collaborative community to share knowledge and insights? This represents a significant opportunity in the financial markets industry.\n\nTradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge. Unlike other alternatives, we focus on building a strong community-driven platform where users can interact, share tips, and empower each other.\n\nOur team comprises experienced entrepreneurs and finance experts, and we generate revenue through subscription services and premium features. In essence, we are the \"LinkedIn for traders,\" revolutionizing the way people engage in financial markets."
            }
        }
    else:
        # Default content for other industries
        content = {
            "industry": industry,
            "name": "StartupCo",
            "leanCanvas": {
                "problems": ["Market inefficiencies", "Customer pain points", "Technology gaps"],
                "solutions": ["Innovative platform", "Technology solution", "Service optimization"],
                "customers": ["Target demographic", "Business users", "End consumers"],
                "competitors": ["Industry leader 1", "Industry leader 2", "Emerging competitor"],
                "valueProposition": "Innovative solution that solves key market problems efficiently",
                "channels": ["Digital marketing", "Direct sales", "Partnerships"],
                "revenue": ["Subscription fees", "Transaction fees", "Premium services"],
                "keyMetrics": ["User acquisition", "Revenue growth", "Customer satisfaction"]
            },
            "hypotheses": [
                {
                    "type": "Desirability",
                    "text": "Target customers have the problem we are solving",
                    "criticality": "High",
                    "method": "Customer interviews"
                },
                {
                    "type": "Viability",
                    "text": "Business model generates sustainable revenue",
                    "criticality": "High",
                    "method": "Financial modeling"
                },
                {
                    "type": "Feasibility",
                    "text": "Solution can be built with available technology",
                    "criticality": "Medium",
                    "method": "Technical validation"
                }
            ],
            "storytelling": {
                "names": ["StartupCo", "InnovateTech", "BusinessFlow", "TechSolution", "GrowthHub"],
                "mission": "To solve important problems and create value for our customers through innovative solutions.",
                "vision": "To become a leading company that transforms how people interact with technology.",
                "values": [
                    "Innovation: Constantly pushing boundaries",
                    "Quality: Delivering excellent solutions",
                    "Impact: Making a meaningful difference"
                ],
                "elevatorPitch": "Our startup addresses key market needs through innovative technology solutions that create value for customers and drive business growth."
            }
        }
    
    return content

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
