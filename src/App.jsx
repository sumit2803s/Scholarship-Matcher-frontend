import React, { useState } from "react";
import "./App.css";

function App() {
    const [profile, setProfile] = useState({
        gpa: "",
        programType: "",
        country: "",
        financialNeed: false,
    });
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile({ ...profile, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://scholarship-matcher-backend-production.up.railway.app/api/match",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profile),
                }
            );

            if (!response.ok) {
                console.error("❌ Backend error:", response.status, response.statusText);
                return;
            }

            const data = await response.json();

            // ✅ Backend returns an array, not { results: [...] }
            setResults(Array.isArray(data) ? data : data.results || []);
        } catch (error) {
            console.error("❌ Network error:", error);
        }
    };

    return (
        <div className="card">
            <h1>Scholarship Matcher</h1>
            <p className="subtitle">Find scholarships that fit your profile</p>

            <form onSubmit={handleSubmit}>
                <label>Minimum GPA</label>
                <input
                    type="number"
                    name="gpa"
                    value={profile.gpa}
                    onChange={handleChange}
                    placeholder="Enter your GPA"
                    step="0.1"
                    required
                />

                <label>Program Type</label>
                <select
                    name="programType"
                    value={profile.programType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                </select>

                <label>Country</label>
                <select
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select your country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Australia">Australia</option>
                </select>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="financialNeed"
                        checked={profile.financialNeed}
                        onChange={handleChange}
                    />
                    Financial Need
                </label>

                <button type="submit">Find Scholarships</button>
            </form>

            {results.length > 0 && (
                <div className="results">
                    <h2>Matched Scholarships</h2>
                    <div className="results-list">
                        {results.map((s, i) => (
                            <div key={i} className="result-card">
                                <h3>{s.title}</h3>
                                <p><strong>Provider:</strong> {s.provider}</p>
                                <p><strong>Country:</strong> {s.country}</p>
                                <p><strong>Deadline:</strong> {s.deadline}</p>
                                {s.applyUrl && (
                                    <a href={s.applyUrl} target="_blank" rel="noopener noreferrer">
                                        Apply Here
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
