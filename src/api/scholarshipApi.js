const API_BASE = "https://scholarship-matcher-backend-production.up.railway.app/";



export const matchScholarships = async (profile) => {
    try {
        const res = await fetch(`${API_BASE}/match`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        });
        if (!res.ok) throw new Error("Network response not ok");
        return await res.json();
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};
