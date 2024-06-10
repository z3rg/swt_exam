require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

app.use(helmet()); // Add Helmet to enhance API's security
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

app.use('/users', userRoutes);
app.use('/images', imageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
