// streaming.js
export async function fetchStreamingAvailability(title) {
    try {
        const url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${encodeURIComponent(title)}&country=us`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY, // pulled from .env
                "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
            }
        });

        if (!response.ok) {
            throw new Error(`Streaming API error: ${response.status}`);
        }

        const data = await response.json();
        const locations = data.results[0]?.locations || [];

        return {
            netflix: locations.some(loc => loc.name.toLowerCase().includes("netflix")),
            prime: locations.some(loc => loc.name.toLowerCase().includes("prime")),
            disney: locations.some(loc => loc.name.toLowerCase().includes("disney"))
        };
    } catch (err) {
        console.error("Streaming API failed:", err);
        // fallback: return all false if API fails
        return { netflix: false, prime: false, disney: false };
    }
}
