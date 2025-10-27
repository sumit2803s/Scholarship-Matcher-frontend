import { useState } from "react";

export default function ScholarshipForm({ onSubmit }) {
    const [gpa, setGpa] = useState("");
    const [programType, setProgramType] = useState("MBA");
    const [financialNeed, setFinancialNeed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            gpa: parseFloat(gpa),
            programType,
            financialNeed,
            keywords: [], // optional
            country: "Global"
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow">
            <div>
                <label>GPA:</label>
                <input
                    type="number"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div>
                <label>Program Type:</label>
                <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="MBA">MBA</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Undergraduate">Undergraduate</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={financialNeed}
                        onChange={(e) => setFinancialNeed(e.target.checked)}
                    />{" "}
                    Financial Need
                </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Find Scholarships
            </button>
        </form>
    );
}
