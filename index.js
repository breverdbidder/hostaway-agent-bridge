const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const HOSTAWAY_ID = process.env.HOSTAWAY_ACCOUNT_ID;
const HOSTAWAY_KEY = process.env.HOSTAWAY_API_KEY;
const BASE_URL = 'https://api.hostaway.com/v1';

const headers = {
    'Cache-Control': 'no-cache',
    'X-ID': HOSTAWAY_ID,
    'X-Token': HOSTAWAY_KEY,
    'Content-Type': 'application/json'
};

// Home route to confirm it's working
app.get('/', (req, res) => res.send('Duplex Agent Bridge is Online'));

// Tool: Get your Duplex Unit IDs
app.get('/get-listings', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/listings`, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
