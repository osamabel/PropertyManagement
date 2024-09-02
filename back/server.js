const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const propertyRoutes = require('./routes/properties');
const tenantRoutes = require('./routes/tenants');
const paymentRoutes = require('./routes/payments');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
require('dotenv').config();

// Enable CORS and JSON parsing
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Define routes
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/properties', propertyRoutes);
app.use('/', tenantRoutes);
app.use('/payments', paymentRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Property Management API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});