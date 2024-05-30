import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './config/DbConfig.js';
import { config } from 'dotenv';
import guestRoute from './routes/guest.route.js';
import loginRoute from './routes/login.route.js';
import bodyParser from 'body-parser';
import dashboardRoute from './routes/dashboard.route.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Load environment variables from .env file
config();

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');



app.set('trust proxy', true);
// 
// Session middleware with MongoDB
app.use(session({
  proxy: true,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // Replace with your MongoDB connection string
    collectionName: 'sessions'
  })
}));

// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());

// Logging middleware to log session data
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});



// Use the guest routes
app.use('/data', guestRoute);

// Use the login routes
app.use('/', loginRoute);

// Use the dashboard routes
app.use('/adm', dashboardRoute);

// Set the location of the views folder
const viewsDirectories = [
  path.join(__dirname, 'views')
];

app.set('views', viewsDirectories);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error handling request:", err);
  res.status(500).send("Internal Server Error");
});

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to start the server:", error);
});
