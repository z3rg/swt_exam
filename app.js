// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const indexRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Use the index routes
app.use('/', indexRoutes);

// Use the user routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
