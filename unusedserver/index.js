const app = require('./app');
// const router = require('./routes');

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);
// router(app);

// refactored code for easier test and feature scale
