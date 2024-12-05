// pages/api/sendtosheets.js
import { google } from 'googleapis';

// Retrieve Google Sheet ID and Range from environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID; // Your Google Sheet ID
const SHEET_RANGE = 'Sheet1!A:C'; // Adjust this range if needed

// Function to authenticate and append data to Google Sheets
async function appendToGoogleSheet(data) {
  try {
    // Set up GoogleAuth with service account credentials from environment variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Service account email
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Private key with newlines
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append data to the Google Sheets document
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [data], // Data should be in an array format: [timestamp, email, provider]
      },
    });

    console.log('Data successfully appended to the Google Sheet');
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error.message);
    throw new Error('Failed to append data to Google Sheets');
  }
}

// API handler for POST and OPTIONS requests
export default async function handler(req, res) {
  // CORS headers to handle browser requests
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Respond to preflight with 200
  }

  // Ensure the request is a POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  // Extract email and provider from request body
  const { email, provider } = req.body;

  // Validate input fields
  if (!email || !provider) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    // Get current timestamp
    const timestamp = new Date().toISOString(); // Format as ISO string

    // Call function to append data to Google Sheets
    await appendToGoogleSheet([timestamp, email, provider]);

    // Send response indicating success
    res.status(200).json({ message: 'Data appended successfully' });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).send({ message: 'Failed to append data to Google Sheets' });
  }
}
