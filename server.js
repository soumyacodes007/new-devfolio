const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Allow JSON requests
app.use(express.static(path.join(__dirname))); // Serve static files from root directory


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/hackathons", async (req, res) => {
    try {
        const response = await axios.post("https://api.devfolio.co/api/search/hackathons", {
            type: "application_open",
            from: 0,
            size: 50
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Origin": "https://devfolio.co",
                "Referer": "https://devfolio.co/"
            }
        });

        res.json(response.data); // Send API response to frontend
    } catch (error) {
        console.error("Error fetching hackathons:", error.message);
        res.status(500).json({ error: "Failed to fetch hackathons" });
    }
});

// ✅ Keep the existing POST route
app.post("/hackathons", async (req, res) => {
    try {
        const response = await axios.post("https://api.devfolio.co/api/search/hackathons", {
            type: "application_open",
            from: 0,
            size: 50
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Origin": "https://devfolio.co",
                "Referer": "https://devfolio.co/"
            }
        });

        res.json(response.data); // Send API response to frontend
    } catch (error) {
        console.error("Error fetching hackathons:", error.message);
        res.status(500).json({ error: "Failed to fetch hackathons" });
    }
});

// Add a debug route to log API response structure
app.get("/debug", async (req, res) => {
    try {
        const response = await axios.post("https://api.devfolio.co/api/search/hackathons", {
            type: "application_open",
            from: 0,
            size: 1
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Origin": "https://devfolio.co",
                "Referer": "https://devfolio.co/"
            }
        });

        console.log(JSON.stringify(response.data.hits.hits[0], null, 2));
        res.json({ message: "Debug information logged to console" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch debug info" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
