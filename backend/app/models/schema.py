from pydantic import BaseModel
from typing import Optional, List

class EducationEntry(BaseModel):
    school: str
    degree: str
    dates: str
    description: str

class RecommendationEntry(BaseModel):
    name: str
    species: str
    company: str
    quote: str
    emoji: Optional[str] = None

class GenerateProfileRequest(BaseModel):
    pet_name: str
    species: str
    personality: str
    photo_caption: Optional[str] = None

class GenerateProfileResponse(BaseModel):
    headline: str
    work_experience: str
    work_title: Optional[str] = None
    work_company: Optional[str] = None
    work_dates: Optional[str] = None
    work_location: Optional[str] = None
    education: List[EducationEntry]
    skills: List[str]
    recommendations: List[RecommendationEntry]
    endorsements: Optional[List[str]] = None
