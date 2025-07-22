import React, { useState, useRef } from "react";
import { PetProfile } from "../components/PetProfile";
import { Loader } from "../components/Loader";
import html2canvas from "html2canvas";
import { FloatingEmojisBackground } from "../components/FloatingEmojisBackground";

export default function CreatePetProfile() {
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [personality, setPersonality] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let uploadedPhotoUrl = null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      const uploadRes = await fetch(`${apiUrl}/upload_photo`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      uploadedPhotoUrl = uploadData.url;
      setPhotoUrl(uploadedPhotoUrl);
    }
    const res = await fetch(`${apiUrl}/generate_profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pet_name: petName,
        species,
        personality,
        photo_caption: uploadedPhotoUrl ? `Photo: ${uploadedPhotoUrl}` : undefined,
      }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
    setShareUrl(null);
  };

  const handleExportPNG = async () => {
    if (profileRef.current) {
      // Wait for all images in the profile card to load
      const images = profileRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          img =>
            img.complete
              ? Promise.resolve()
              : new Promise(resolve => {
                  img.onload = img.onerror = resolve;
                })
        )
      );
      const canvas = await html2canvas(profileRef.current, {
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `${petName}_pet_linkedin.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleShare = () => {
    // For demo, just copy current URL with a query param (could be improved with real shareable links)
    const url = `${window.location.origin}/create?pet=${encodeURIComponent(petName)}`;
    navigator.clipboard.writeText(url);
    setShareUrl(url);
  };

  return (
    <div className="max-w-xl mx-auto py-10 relative">
      <FloatingEmojisBackground />
      <h1 className="text-3xl font-bold mb-6 text-center">Create Pet LinkedIn Profile</h1>
      {!result && !loading && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={petName}
              onChange={e => setPetName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={species}
              onChange={e => setSpecies(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              value={personality}
              onChange={e => setPersonality(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={e => setPhoto(e.target.files?.[0] || null)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
      )}
      {loading && <Loader />}
      {result && (
        <div className="mt-8">
          <div ref={profileRef}>
            <PetProfile
              photoUrl={photoUrl ? `http://localhost:8000${photoUrl}` : "/api/placeholder/80/80"}
              name={petName}
              headline={result.headline}
              workExperience={result.work_experience}
              workTitle={result.work_title}
              workCompany={result.work_company}
              workDates={result.work_dates}
              workLocation={result.work_location}
              education={result.education}
              skills={result.skills}
              recommendations={result.recommendations}
              endorsements={result.endorsements}
            />
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 border border-green-600"
              onClick={handleExportPNG}
            >
              Export as PNG
            </button>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 border border-blue-600"
              onClick={handleShare}
            >
              Copy Shareable Link
            </button>
          </div>
          {shareUrl && (
            <div className="mt-2 text-center text-green-700 text-sm">
              Link copied! <a href={shareUrl} className="underline">Open</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
