import requests
import json
import time
import uuid
import os
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv
from pathlib import Path

# Get the backend URL from the frontend .env file
FRONTEND_ENV_PATH = Path("/app/frontend/.env")
load_dotenv(FRONTEND_ENV_PATH)

BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001")
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Using backend URL: {BACKEND_URL}")

class ZigZagBackendTester:
    def __init__(self):
        self.created_ideas = []
        
    def run_all_tests(self):
        """Run all backend tests and report results"""
        print("\n===== ZIGZAG PLATFORM BACKEND TESTING =====\n")
        
        # Test basic API connectivity
        self.test_api_connectivity()
        
        # Test AI Content Generation
        self.test_ai_content_generation()
        
        # Test CRUD operations
        self.test_crud_operations()
        
        # Test end-to-end flow
        self.test_end_to_end_flow()
        
        # Clean up created resources
        self.cleanup()
        
        print("\n===== TESTING COMPLETE =====\n")
    
    def test_api_connectivity(self):
        """Test basic API connectivity"""
        print("\n----- Testing API Connectivity -----")
        
        try:
            response = requests.get(f"{API_BASE_URL}/")
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            data = response.json()
            assert "message" in data, "Response missing 'message' field"
            assert data["message"] == "ZigZag Platform API v1.0.0", f"Unexpected message: {data['message']}"
            print("✅ API connectivity test passed")
        except Exception as e:
            print(f"❌ API connectivity test failed: {str(e)}")
    
    def test_ai_content_generation(self):
        """Test AI content generation with different startup descriptions"""
        print("\n----- Testing AI Content Generation -----")
        
        test_descriptions = [
            "AI-powered personal finance app for Gen Z users",
            "sustainable packaging solution for e-commerce",
            "virtual reality training platform for healthcare workers",
            "social trading platform for retail investors",
            "EdTech platform for coding bootcamps"
        ]
        
        for description in test_descriptions:
            print(f"\nTesting AI generation with: '{description}'")
            start_time = time.time()
            try:
                response = requests.post(
                    f"{API_BASE_URL}/generate-startup-content",
                    json={"description": description}
                )
                
                end_time = time.time()
                duration = end_time - start_time
                
                assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
                
                data = response.json()
                self._validate_generated_content(data, description)
                print(f"✅ AI generation test passed for: '{description}'")
                print(f"   Response time: {duration:.2f} seconds")
            except Exception as e:
                print(f"❌ AI generation test failed for '{description}': {str(e)}")
    
    def _validate_generated_content(self, data: Dict[str, Any], description: str):
        """Validate the structure and content of generated AI content"""
        # Check required fields
        required_fields = ["industry", "name", "leanCanvas", "hypotheses", "storytelling"]
        for field in required_fields:
            assert field in data, f"Missing required field: {field}"
        
        # Validate leanCanvas structure
        lean_canvas = data["leanCanvas"]
        lean_canvas_fields = ["problems", "solutions", "customers", "competitors", 
                             "valueProposition", "channels", "revenue", "keyMetrics"]
        for field in lean_canvas_fields:
            assert field in lean_canvas, f"Missing leanCanvas field: {field}"
        
        # Validate hypotheses
        assert isinstance(data["hypotheses"], list), "hypotheses should be a list"
        assert len(data["hypotheses"]) > 0, "hypotheses list should not be empty"
        
        for hypothesis in data["hypotheses"]:
            assert "type" in hypothesis, "hypothesis missing 'type'"
            assert "text" in hypothesis, "hypothesis missing 'text'"
            assert "criticality" in hypothesis, "hypothesis missing 'criticality'"
            assert "method" in hypothesis, "hypothesis missing 'method'"
        
        # Validate storytelling
        storytelling = data["storytelling"]
        storytelling_fields = ["names", "mission", "vision", "values", "elevatorPitch"]
        for field in storytelling_fields:
            assert field in storytelling, f"Missing storytelling field: {field}"
        
        # Check if content is relevant to the description
        description_lower = description.lower()
        
        # Check if industry matches description
        if "finance" in description_lower or "gen z" in description_lower:
            assert any(term in data["industry"].lower() for term in ["finance", "fin", "bank", "tech"]), \
                f"Industry '{data['industry']}' doesn't match finance description"
        elif "trading" in description_lower:
            assert any(term in data["industry"].lower() for term in ["trading", "finance", "fin", "invest"]), \
                f"Industry '{data['industry']}' doesn't match trading description"
        elif "packaging" in description_lower or "e-commerce" in description_lower:
            assert any(term in data["industry"].lower() for term in ["package", "commerce", "retail", "sustain", "logistic"]), \
                f"Industry '{data['industry']}' doesn't match packaging description"
        elif "virtual reality" in description_lower or "healthcare" in description_lower:
            assert any(term in data["industry"].lower() for term in ["health", "vr", "virtual", "tech", "medical"]), \
                f"Industry '{data['industry']}' doesn't match VR healthcare description"
        elif "edtech" in description_lower or "coding" in description_lower:
            assert any(term in data["industry"].lower() for term in ["ed", "education", "tech", "learn"]), \
                f"Industry '{data['industry']}' doesn't match EdTech description"
    
    def test_crud_operations(self):
        """Test CRUD operations for startup ideas"""
        print("\n----- Testing Startup Ideas CRUD Operations -----")
        
        # Test Create operation
        print("\nTesting CREATE operation")
        idea_id = self._test_create_startup_idea()
        
        # Test Read All operation
        print("\nTesting READ ALL operation")
        self._test_get_all_startup_ideas()
        
        # Test Read One operation
        print("\nTesting READ ONE operation")
        self._test_get_startup_idea(idea_id)
        
        # Test Update operation
        print("\nTesting UPDATE operation")
        self._test_update_startup_idea(idea_id)
        
        # Test Delete operation
        print("\nTesting DELETE operation")
        self._test_delete_startup_idea(idea_id)
        
        # Test error handling with non-existent ID
        print("\nTesting error handling with non-existent ID")
        self._test_error_handling_nonexistent_id()
    
    def _test_create_startup_idea(self) -> str:
        """Test creating a new startup idea"""
        try:
            # Create a sample startup idea
            new_idea = {
                "name": "TestStartup",
                "description": "A test startup for API validation",
                "industry": "technology",
                "leanCanvas": {
                    "problems": ["Problem 1", "Problem 2"],
                    "solutions": ["Solution 1", "Solution 2"],
                    "customers": ["Customer 1", "Customer 2"],
                    "competitors": ["Competitor 1", "Competitor 2"],
                    "valueProposition": "Test value proposition",
                    "channels": ["Channel 1", "Channel 2"],
                    "revenue": ["Revenue 1", "Revenue 2"],
                    "keyMetrics": ["Metric 1", "Metric 2"]
                },
                "hypotheses": [
                    {
                        "type": "Desirability",
                        "text": "Test hypothesis 1",
                        "criticality": "High",
                        "method": "Test method 1"
                    }
                ],
                "storytelling": {
                    "names": ["Name 1", "Name 2"],
                    "mission": "Test mission",
                    "vision": "Test vision",
                    "values": ["Value 1", "Value 2"],
                    "elevatorPitch": "Test elevator pitch"
                },
                "userId": f"test-user-{uuid.uuid4()}"
            }
            
            response = requests.post(f"{API_BASE_URL}/startup-ideas", json=new_idea)
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            
            data = response.json()
            assert "id" in data, "Response missing 'id' field"
            
            # Store created idea ID for cleanup
            self.created_ideas.append(data["id"])
            
            print(f"✅ CREATE operation test passed. Created idea with ID: {data['id']}")
            return data["id"]
        except Exception as e:
            print(f"❌ CREATE operation test failed: {str(e)}")
            return ""
    
    def _test_get_all_startup_ideas(self):
        """Test retrieving all startup ideas"""
        try:
            response = requests.get(f"{API_BASE_URL}/startup-ideas")
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            
            data = response.json()
            assert isinstance(data, list), "Response should be a list"
            
            print(f"✅ READ ALL operation test passed. Retrieved {len(data)} ideas")
        except Exception as e:
            print(f"❌ READ ALL operation test failed: {str(e)}")
    
    def _test_get_startup_idea(self, idea_id: str):
        """Test retrieving a specific startup idea"""
        if not idea_id:
            print("⚠️ Skipping READ ONE test: No idea ID available")
            return
        
        try:
            response = requests.get(f"{API_BASE_URL}/startup-ideas/{idea_id}")
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            
            data = response.json()
            assert data["id"] == idea_id, f"Expected ID {idea_id}, got {data['id']}"
            
            print(f"✅ READ ONE operation test passed for idea ID: {idea_id}")
        except Exception as e:
            print(f"❌ READ ONE operation test failed: {str(e)}")
    
    def _test_update_startup_idea(self, idea_id: str):
        """Test updating a startup idea"""
        if not idea_id:
            print("⚠️ Skipping UPDATE test: No idea ID available")
            return
        
        try:
            # Update data
            update_data = {
                "name": "Updated TestStartup",
                "description": "Updated description for testing"
            }
            
            response = requests.put(f"{API_BASE_URL}/startup-ideas/{idea_id}", json=update_data)
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            
            data = response.json()
            assert data["name"] == update_data["name"], f"Name not updated. Expected '{update_data['name']}', got '{data['name']}'"
            assert data["description"] == update_data["description"], f"Description not updated"
            
            print(f"✅ UPDATE operation test passed for idea ID: {idea_id}")
        except Exception as e:
            print(f"❌ UPDATE operation test failed: {str(e)}")
    
    def _test_delete_startup_idea(self, idea_id: str):
        """Test deleting a startup idea"""
        if not idea_id:
            print("⚠️ Skipping DELETE test: No idea ID available")
            return
        
        try:
            response = requests.delete(f"{API_BASE_URL}/startup-ideas/{idea_id}")
            assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
            
            # Verify deletion
            verify_response = requests.get(f"{API_BASE_URL}/startup-ideas/{idea_id}")
            assert verify_response.status_code == 404, f"Expected status code 404, got {verify_response.status_code}"
            
            # Remove from cleanup list
            if idea_id in self.created_ideas:
                self.created_ideas.remove(idea_id)
            
            print(f"✅ DELETE operation test passed for idea ID: {idea_id}")
        except Exception as e:
            print(f"❌ DELETE operation test failed: {str(e)}")
    
    def _test_error_handling_nonexistent_id(self):
        """Test error handling with non-existent ID"""
        try:
            # Generate a random UUID that doesn't exist
            nonexistent_id = str(uuid.uuid4())
            
            # Test GET
            get_response = requests.get(f"{API_BASE_URL}/startup-ideas/{nonexistent_id}")
            assert get_response.status_code == 404, f"Expected status code 404 for GET, got {get_response.status_code}"
            
            # Test PUT
            put_response = requests.put(
                f"{API_BASE_URL}/startup-ideas/{nonexistent_id}",
                json={"name": "Updated Name"}
            )
            assert put_response.status_code == 404, f"Expected status code 404 for PUT, got {put_response.status_code}"
            
            # Test DELETE
            delete_response = requests.delete(f"{API_BASE_URL}/startup-ideas/{nonexistent_id}")
            assert delete_response.status_code == 404, f"Expected status code 404 for DELETE, got {delete_response.status_code}"
            
            print("✅ Error handling test passed for non-existent ID")
        except Exception as e:
            print(f"❌ Error handling test failed: {str(e)}")
    
    def test_end_to_end_flow(self):
        """Test end-to-end flow: generate content, save, retrieve"""
        print("\n----- Testing End-to-End Flow -----")
        
        try:
            # Step 1: Generate content
            print("\nStep 1: Generating AI content")
            description = "AI-powered fitness app for personalized workouts"
            
            generate_response = requests.post(
                f"{API_BASE_URL}/generate-startup-content",
                json={"description": description}
            )
            assert generate_response.status_code == 200, f"Expected status code 200, got {generate_response.status_code}"
            
            generated_content = generate_response.json()
            
            # Step 2: Create startup idea with generated content
            print("\nStep 2: Creating startup idea with generated content")
            
            new_idea = {
                "name": generated_content["name"],
                "description": description,
                "industry": generated_content["industry"],
                "leanCanvas": generated_content["leanCanvas"],
                "hypotheses": generated_content["hypotheses"],
                "storytelling": generated_content["storytelling"],
                "userId": f"test-user-{uuid.uuid4()}"
            }
            
            create_response = requests.post(f"{API_BASE_URL}/startup-ideas", json=new_idea)
            assert create_response.status_code == 200, f"Expected status code 200, got {create_response.status_code}"
            
            created_idea = create_response.json()
            idea_id = created_idea["id"]
            self.created_ideas.append(idea_id)
            
            # Step 3: Retrieve the created idea
            print("\nStep 3: Retrieving the created idea")
            
            get_response = requests.get(f"{API_BASE_URL}/startup-ideas/{idea_id}")
            assert get_response.status_code == 200, f"Expected status code 200, got {get_response.status_code}"
            
            retrieved_idea = get_response.json()
            
            # Verify data integrity
            assert retrieved_idea["name"] == new_idea["name"], "Name mismatch"
            assert retrieved_idea["description"] == new_idea["description"], "Description mismatch"
            assert retrieved_idea["industry"] == new_idea["industry"], "Industry mismatch"
            
            print("✅ End-to-end flow test passed")
        except Exception as e:
            print(f"❌ End-to-end flow test failed: {str(e)}")
    
    def cleanup(self):
        """Clean up any resources created during testing"""
        print("\n----- Cleaning Up Test Resources -----")
        
        for idea_id in self.created_ideas:
            try:
                requests.delete(f"{API_BASE_URL}/startup-ideas/{idea_id}")
                print(f"Deleted test idea with ID: {idea_id}")
            except Exception as e:
                print(f"Failed to delete test idea with ID {idea_id}: {str(e)}")
        
        self.created_ideas = []
        print("Cleanup complete")


if __name__ == "__main__":
    tester = ZigZagBackendTester()
    tester.run_all_tests()
