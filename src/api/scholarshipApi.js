const BASE_URL = "http://localhost:8080/api/scholarships"; // Spring Boot URL

export const matchScholarships = async (profile) => {
    try {
        const res = await fetch(`${BASE_URL}/match`, {
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
