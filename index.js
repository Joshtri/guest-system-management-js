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
import FileStore from 'session-file-store';

const FileStoreSession = FileStore(session);

// Load environment variables from .env file
config();

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON requests

// Gunakan middleware untuk membaca JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());

// Session middleware
app.use(session({
  store: new FileStoreSession({
      path: './session',
      ttl: 3600, // Time to live in seconds
      retries: 5 // Number of retries to get session data
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 3600000 // Cookie expiration in milliseconds
  }
}));
// Use the guest routes
app.use('/data', guestRoute);

// Use the login routes
app.use('/', loginRoute);

// Use the dashboard routes
app.use('/adm', dashboardRoute);

// Tentukan lokasi folder views
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
