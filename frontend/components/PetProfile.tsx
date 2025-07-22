import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Link2, MapPin, Calendar } from "lucide-react"

interface EducationEntry {
  school: string;
  degree: string;
  dates: string;
  description: string;
}

interface RecommendationEntry {
  name: string;
  species: string;
  company: string;
  quote: string;
  emoji?: string;
}

interface PetProfileProps {
  photoUrl: string;
  name: string;
  headline: string;
  workExperience: string;
  workTitle?: string;
  workCompany?: string;
  workDates?: string;
  workLocation?: string;
  education: EducationEntry[];
  skills: string[];
  recommendations: RecommendationEntry[];
  endorsements?: string[];
}

export const PetProfile: React.FC<PetProfileProps> = ({
  photoUrl,
  name,
  headline,
  workExperience,
  workTitle,
  workCompany,
  workDates,
  workLocation,
  education,
  skills,
  recommendations,
  endorsements,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white">
      <Card className="overflow-hidden border border-gray-200 shadow-lg">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative pb-10">
          {/* Decorative Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Floating paw prints */}
            <div className="absolute top-2 right-4 text-white/20 text-lg">🐾</div>
            <div className="absolute top-6 right-12 text-white/15 text-sm">🐾</div>
            <div className="absolute top-4 left-16 text-white/10 text-xs">🐾</div>
            {/* Geometric shapes */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
          {/* Profile Photo */}
          <div className="absolute -bottom-10 left-6 z-10">
            <img
              src={photoUrl}
              alt={name}
              crossOrigin="anonymous"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        <CardContent className="pt-14 pb-6 px-6">
          {/* Pet Name & Headline */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{name} 🐾</h1>
            <p className="text-base text-gray-600 mb-2">{headline}</p>
            {workLocation && (
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{workLocation}</span>
              </div>
            )}
            <p className="text-sm text-blue-600 font-medium">500+ connections</p>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Experience</h2>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center text-lg flex-shrink-0">
                🏢
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{workTitle}</h3>
                <p className="text-gray-600 text-sm">{workCompany}</p>
                {workDates && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{workDates}</span>
                  </div>
                )}
                {workLocation && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{workLocation}</span>
                  </div>
                )}
                <p className="text-sm text-gray-700 mt-2">
                  {workExperience}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
            {education.map((edu, i) => (
              <div className="flex items-start space-x-3 mb-4" key={i}>
                <div className={`w-12 h-12 ${i === 0 ? 'bg-green-100' : 'bg-purple-100'} rounded flex items-center justify-center text-lg flex-shrink-0`}>
                  {i === 0 ? '🎓' : '📚'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{edu.dates}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-6" />

          {/* Recommendations */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className={`border-l-4 pl-4 py-2 ${
                  i % 3 === 0 ? "border-blue-500" : 
                  i % 3 === 1 ? "border-green-500" : 
                  "border-purple-500"
                }`}>
                  <p className="text-sm text-gray-700 italic mb-2">
                    "{rec.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${
                      i % 3 === 0 ? "bg-yellow-100" : 
                      i % 3 === 1 ? "bg-pink-100" : 
                      "bg-blue-100"
                    } rounded-full flex items-center justify-center text-sm mr-2`}>
                      {rec.emoji || "🐾"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{rec.name}</p>
                      <p className="text-xs text-gray-500">{rec.species} at {rec.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">Pet LinkedIn Profile • For animal professionals & their humans</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}