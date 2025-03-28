const express = require('express');
const path = require('path');

// Load rate from Price.json
const priceData = require(path.join(__dirname, 'Price.json'));
const ratePerKg = priceData.rate;

// Initialize Express app
const app = express();
app.use(express.json());

// Endpoint to calculate price based on weight
app.post('/calculate', (req, res) => {
  const { weight } = req.body;

  if (!weight || typeof weight !== 'number' || weight <= 0) {
    return res.status(400).json({ error: 'Invalid weight provided.' });
  }

  const price = weight * ratePerKg;
  res.json({ weight, price });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
