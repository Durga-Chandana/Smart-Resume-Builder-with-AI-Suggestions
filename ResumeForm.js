// Smart Resume Builder (OpenAI Suggestions with Fallback)

import { useState } from 'react';
import axios from 'axios';

const defaultResume = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  experience: '',
  education: '',
  skills: '',
};

function getSuggestions(data, role = 'general') {
  const suggestions = [];

  if (!data.summary || data.summary.length < 50)
    suggestions.push("Your summary is too short. Add achievements, goals, or key skills.");
  if (!data.experience || data.experience.trim().length < 30)
    suggestions.push("You should include some job experience with role, company, and impact.");
  if (!data.email.includes("@"))
    suggestions.push("Please enter a valid email address.");
  if (data.phone.length < 10)
    suggestions.push("Your phone number seems too short — use a valid 10-digit number.");

  const optional = [];

  if (
    !data.education.toLowerCase().includes("b.tech") &&
    !data.education.toLowerCase().includes("bachelor") &&
    !data.education.toLowerCase().includes("degree")
  ) {
    optional.push("Mention your degree clearly — B.Tech, M.Sc, etc.");
  }

  const skills = data.skills.toLowerCase();
  if (!skills.includes("communication")) optional.push("Include 'communication' as a soft skill.");
  if (!skills.includes("teamwork")) optional.push("Mention 'teamwork' or 'collaboration'.");
  if (!skills.includes("problem-solving")) optional.push("Add 'problem-solving' as a skill.");

  if (role === 'developer') {
    if (!skills.includes("javascript") && !skills.includes("react"))
      optional.push("For developer roles, add JavaScript, React, or backend tech.");
  }

  if (role === 'designer') {
    if (!skills.includes("figma") && !skills.includes("adobe"))
      optional.push("Designers should mention tools like Figma or Adobe XD.");
  }

  if (role === 'manager') {
    if (!skills.includes("leadership") && !skills.includes("planning"))
      optional.push("Project managers should include leadership and planning experience.");
  }

  const shuffled = optional.sort(() => 0.5 - Math.random());
  suggestions.push(...shuffled.slice(0, 2));

  return suggestions;
}

async function fetchOpenAISuggestions(resumeData, role) {
  try {
    const response = await axios.post('http://localhost:5000/api/openai-suggestions', {
      resume: resumeData
    });

    return response.data.suggestions;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return getSuggestions(resumeData, role); // Fallback to local logic
  }
}

export default function ResumeBuilder() {
  const [resume, setResume] = useState(defaultResume);
  const [suggestions, setSuggestions] = useState([]);
  const [jobRole, setJobRole] = useState('general');

  const handleChange = (e) => {
    const updated = { ...resume, [e.target.name]: e.target.value };
    setResume(updated);
  };

  const handleExport = () => {
    window.print();
  };

  const handleSuggest = () => {
    setSuggestions(getSuggestions(resume, jobRole));
  };

  const handleOpenAISuggest = async () => {
    const aiSuggestions = await fetchOpenAISuggestions(resume, jobRole);
    setSuggestions(aiSuggestions);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-center text-amber-800 tracking-tight">
          Smart Resume Builder
        </h1>
      </header>

      <div className="mb-6">
        <label className="block font-medium text-amber-700 mb-1">Target Job Role</label>
        <select
          className="border border-amber-300 rounded-md p-2 w-full"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        >
          <option value="general">General</option>
          <option value="developer">Developer</option>
          <option value="designer">UI/UX Designer</option>
          <option value="manager">Project Manager</option>
        </select>
      </div>

      <section className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-amber-200 hover:shadow-xl transition-shadow duration-300">
        {Object.entries(resume).map(([key, value]) => (
          <div key={key} className="hover:scale-[1.01] transition-transform">
            <label className="block capitalize font-medium text-amber-700 mb-1">{key}</label>
            {(key === 'summary' || key === 'experience' || key === 'education' || key === 'skills') ? (
              <textarea
                name={key}
                value={value}
                onChange={handleChange}
                className="border border-amber-300 bg-white rounded-md p-3 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border border-amber-300 bg-white rounded-md p-3 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-4 justify-end">
          <button
            onClick={handleSuggest}
            className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 hover:scale-105 transition-all"
          >
            Get AI Suggestions (Local)
          </button>
          <button
            onClick={handleOpenAISuggest}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-all"
          >
            Get AI Suggestions (OpenAI)
          </button>
          <button
            onClick={handleExport}
            className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700 hover:scale-105 transition-all"
          >
            Export PDF
          </button>
        </div>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 mt-10 p-4 rounded hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2 text-amber-800">Suggestions</h2>
        <ul className="list-disc list-inside text-amber-700">
          {suggestions.length > 0 ? suggestions.map((s, i) => <li key={i}>{s}</li>) : <li>No suggestions yet.</li>}
        </ul>
      </section>

      <section className="mt-10 bg-white rounded shadow p-6 print:border-none print:shadow-none print:p-2 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold text-amber-800 border-b pb-2 mb-4">Resume Preview</h2>
        <div className="space-y-2 text-gray-700">
          <div><strong>Name:</strong> {resume.name}</div>
          <div><strong>Email:</strong> {resume.email}</div>
          <div><strong>Phone:</strong> {resume.phone}</div>
          <div><strong>Summary:</strong><br />{resume.summary}</div>
          <div><strong>Experience:</strong><br />{resume.experience}</div>
          <div><strong>Education:</strong><br />{resume.education}</div>
          <div><strong>Skills:</strong><br />{resume.skills}</div>
        </div>
      </section>
    </div>
  );
}

