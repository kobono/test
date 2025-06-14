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
    """Generate comprehensive startup content using OpenAI GPT"""
    description = request.get("description", "")
    
    if not description:
        raise HTTPException(status_code=400, detail="Description is required")
    
    try:
        # Import the emergentintegrations library
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        # Get OpenAI API key from environment
        openai_api_key = os.environ.get('OPENAI_API_KEY')
        if not openai_api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Initialize LLM chat with unique session ID
        session_id = f"startup_generation_{uuid.uuid4().hex[:8]}"
        
        chat = LlmChat(
            api_key=openai_api_key,
            session_id=session_id,
            system_message="""You are an expert startup advisor and business strategist with deep knowledge across multiple industries. 
            Your role is to help entrepreneurs develop comprehensive business plans based on their startup ideas.
            
            You should provide detailed, industry-specific insights and practical advice that can help validate and develop their business concept.
            Focus on creating realistic, actionable content that demonstrates deep understanding of market dynamics, customer needs, and business models.
            
            Always format your responses as valid JSON with the exact structure requested."""
        ).with_model("openai", "gpt-4o").with_max_tokens(4096)
        
        # Create the prompt for generating startup content
        prompt = f"""
        Based on the following startup idea description: "{description}"
        
        Please generate a comprehensive startup business plan analysis. Analyze the idea and provide detailed, industry-specific insights:

        1. **Industry Classification**: Determine the most appropriate industry category
        2. **Business Name**: Suggest a compelling, memorable business name
        3. **Detailed Customer Segments**: Create 4 specific customer personas with detailed descriptions
        4. **Comprehensive Problems**: List 3-4 specific problems this startup solves
        5. **Detailed Solutions**: Provide specific features and capabilities
        6. **Competitors Analysis**: Direct, indirect competitors and alternative solutions
        7. **Revenue Streams**: Multiple specific revenue sources
        8. **All Lean Canvas Components**: Detailed content for each section

        Please respond with a JSON object in this exact format:
        {{
            "industry": "industry_category",
            "name": "Business Name",
            "leanCanvas": {{
                "customerSegments": [
                    {{
                        "name": "Primary Customer Segment",
                        "personaOverview": "Detailed persona description with age, location, background, and characteristics",
                        "customerJobs": [
                            "Specific job or task they need to accomplish",
                            "Another important job to be done",
                            "Third job to be done"
                        ],
                        "customerPains": [
                            "Specific pain point they experience",
                            "Another frustration or challenge",
                            "Third pain point"
                        ]
                    }},
                    {{
                        "name": "Secondary Customer Segment",
                        "personaOverview": "Detailed persona description",
                        "customerJobs": ["job1", "job2", "job3"],
                        "customerPains": ["pain1", "pain2", "pain3"]
                    }},
                    {{
                        "name": "Third Customer Segment", 
                        "personaOverview": "Detailed persona description",
                        "customerJobs": ["job1", "job2", "job3"],
                        "customerPains": ["pain1", "pain2", "pain3"]
                    }},
                    {{
                        "name": "Fourth Customer Segment",
                        "personaOverview": "Detailed persona description", 
                        "customerJobs": ["job1", "job2", "job3"],
                        "customerPains": ["pain1", "pain2", "pain3"]
                    }}
                ],
                "problems": [
                    "Specific problem 1 that affects target customers",
                    "Specific problem 2 related to the industry/market",
                    "Specific problem 3 that creates pain points"
                ],
                "solutions": {{
                    "features": [
                        "Core feature 1 that solves the main problem",
                        "Feature 2 that provides additional value",
                        "Feature 3 that differentiates from competitors",
                        "Feature 4 for enhanced user experience"
                    ],
                    "potentialWaysToPlay": [
                        {{
                            "title": "Strategy 1 Title",
                            "description": "Detailed description of how this strategy would work and benefit users"
                        }},
                        {{
                            "title": "Strategy 2 Title", 
                            "description": "Detailed description of second strategic approach"
                        }},
                        {{
                            "title": "Strategy 3 Title",
                            "description": "Detailed description of third strategic option"
                        }}
                    ]
                }},
                "competitors": {{
                    "direct": [
                        "Direct Competitor 1",
                        "Direct Competitor 2", 
                        "Direct Competitor 3",
                        "Direct Competitor 4"
                    ],
                    "indirect": [
                        "Indirect Competitor 1",
                        "Indirect Competitor 2",
                        "Indirect Competitor 3",
                        "Traditional solution or method"
                    ],
                    "alternatives": [
                        "Alternative solution 1",
                        "Alternative approach 2", 
                        "DIY or manual approach",
                        "Offline equivalent"
                    ]
                }},
                "valueProposition": "Single, clear compelling value proposition that explains why customers should choose this solution",
                "channels": [
                    "Primary distribution channel",
                    "Secondary marketing channel", 
                    "Third customer acquisition method",
                    "Fourth outreach strategy"
                ],
                "revenue": [
                    "Primary revenue stream with specific model",
                    "Secondary revenue source",
                    "Potential third income stream"
                ],
                "keyMetrics": [
                    "Key metric 1 specific to the business model",
                    "Important metric 2 for tracking growth",
                    "Critical metric 3 for success measurement",
                    "Essential metric 4 for business health"
                ],
                "costStructure": [
                    "Major cost category 1",
                    "Important cost factor 2",
                    "Ongoing expense 3",
                    "Investment requirement 4"
                ],
                "unfairAdvantage": "Specific competitive advantage that would be hard to replicate"
            }},
            "hypotheses": [
                {{
                    "type": "Desirability",
                    "text": "Specific hypothesis about customer demand and need for this solution",
                    "criticality": "High",
                    "method": "Specific validation method like customer interviews or surveys"
                }},
                {{
                    "type": "Viability", 
                    "text": "Specific hypothesis about the business model and revenue generation",
                    "criticality": "High",
                    "method": "Specific method to test business viability"
                }},
                {{
                    "type": "Feasibility",
                    "text": "Specific hypothesis about technical or operational capability to deliver the solution",
                    "criticality": "Medium",
                    "method": "Specific method to validate technical feasibility"
                }}
            ],
            "storytelling": {{
                "names": ["Name Option 1 relevant to industry", "Name Option 2", "Name Option 3", "Name Option 4", "Name Option 5"],
                "mission": "Specific mission statement that reflects the startup's purpose in this industry",
                "vision": "Specific vision statement for the company's future in this market", 
                "values": [
                    "Value 1: Detailed description relevant to the industry",
                    "Value 2: Another important value with explanation",
                    "Value 3: Third core value with context"
                ],
                "elevatorPitch": "Compelling elevator pitch that specifically addresses the problem, solution, market, and unique value proposition for this particular startup idea"
            }}
        }}

        Important guidelines:
        - Make ALL content specific to the actual startup idea provided
        - Create realistic customer personas with specific demographics and psychographics
        - Identify real competitors and alternatives in the relevant industry
        - Ensure all problems and solutions are directly related to the described startup
        - Use industry-specific terminology and insights
        - Make the business model realistic and appropriate for the market
        - Create testable, specific hypotheses rather than generic ones
        """
        
        # Send message to AI
        user_message = UserMessage(text=prompt)
        ai_response = await chat.send_message(user_message)
        
        # Parse AI response as JSON
        import json
        try:
            generated_content = json.loads(ai_response)
            return generated_content
        except json.JSONDecodeError:
            # If JSON parsing fails, try to extract JSON from the response
            import re
            json_match = re.search(r'\{.*\}', ai_response, re.DOTALL)
            if json_match:
                generated_content = json.loads(json_match.group())
                return generated_content
            else:
                raise HTTPException(status_code=500, detail="Failed to parse AI response")
        
    except Exception as e:
        logger.error(f"AI generation failed: {str(e)}")
        # Fallback to local generation if AI fails
        return generate_fallback_content(description)

def generate_fallback_content(description: str):
    """Fallback content generation if AI fails"""
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
        return {
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
        return {
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
