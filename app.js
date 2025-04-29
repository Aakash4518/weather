const apiKey = "e07c7564530c56879566ea5363808ba4"; // Store securely in a backend if possible
const weatherButton = document.getElementById("weatherButton");

weatherButton.addEventListener("click", async function () {
    const city = document.getElementById("weatherInput").value.trim();
    const output = document.getElementById("weatherOutput");

    if (!city) {
        alert("Please enter a city!");
        output.innerHTML = `<p style="color: red;">Error: City name cannot be empty.</p>`;
        return;
    }

    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error || !data.location || !data.current) {
            output.innerHTML = `<p style="color: red;">Error: Unable to fetch weather for "${city}".</p>`;
            return;
        }

        output.innerHTML = `
            <p><strong>Weather for ${data.location.name}, ${data.location.country}:</strong></p>
            <p>🌡️ Temperature: ${data.current.temperature}°C</p>
            <p>☁️ Condition: ${data.current.weather_descriptions[0]}</p>
        `;
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: Network issue. Please try again later.</p>`;
    }
});
