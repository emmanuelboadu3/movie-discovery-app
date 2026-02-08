// streaming.js
export async function fetchStreamingAvailability(title) {
    const url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${encodeURIComponent(title)}&country=us`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "80ec22e7a1mshb14d272ace081e0p172898jsn85310e1940fe",
            "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
        }
    });

    const data = await response.json();

    const locations = data.results[0]?.locations || [];

    return {
        netflix: locations.some(loc => loc.name.toLowerCase().includes("netflix")),
        prime: locations.some(loc => loc.name.toLowerCase().includes("prime")),
        disney: locations.some(loc => loc.name.toLowerCase().includes("disney"))
    };
}
