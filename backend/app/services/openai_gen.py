import os
from dotenv import load_dotenv
from app.models.schema import GenerateProfileRequest, GenerateProfileResponse
import json
import logging
import requests
import re

load_dotenv()
logging.basicConfig(level=logging.INFO)

def build_pet_linkedin_prompt(payload: GenerateProfileRequest) -> str:
    prompt = f"""
You are a creative assistant. Write a fun, LinkedIn-style LinkedIn profile for a pet.

Pet Name: {payload.pet_name}
Species: {payload.species}
Personality: {payload.personality}
"""
    if payload.photo_caption:
        prompt += f"Photo Caption: {payload.photo_caption}\n"
    prompt += """
Generate the following fields as a single JSON object:
- headline: A catchy LinkedIn-style headline
- work_experience: A short summary of the pet's work experience
- work_title: The pet's job title
- work_company: The company or place of work
- work_dates: Dates of employment (e.g. 'Jan 2020 - Present')
- work_location: Location of work
- education: An array of education entries, each with school, degree, dates, and description
- skills: An array of skills (with emoji if possible)
- recommendations: An array of recommendations, each with name, species, company, quote, and emoji
Format your response as valid JSON only, no markdown or extra text.
"""
    return prompt

async def generate_pet_profile(payload: GenerateProfileRequest) -> GenerateProfileResponse:
    try:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        prompt = build_pet_linkedin_prompt(payload)
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "mistral-saba-24b",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 700,
            "temperature": 1.1,
        }
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        # Extract JSON from code block if present
        match = re.search(r"```(?:json)?\s*([\s\S]+?)\s*```", content)
        if match:
            content = match.group(1)
        try:
            data = json.loads(content)
        except json.JSONDecodeError:
            logging.error(f"Groq did not return valid JSON: {content}")
            raise
        return GenerateProfileResponse(**data)
    except Exception as e:
        logging.error(f"Error in generate_pet_profile: {e}", exc_info=True)
        raise
