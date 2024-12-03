import { google } from 'googleapis';

// Retrieve Google Sheet ID and Range from environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID;  // Set this in your .env file
const SHEET_RANGE = 'Sheet1!A:B';  // Adjust this if your data is stored in different columns

// Function to authenticate and append data to Google Sheets
async function appendToGoogleSheet(data) {
    try {
        // Set up GoogleAuth with service account credentials from environment variables
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,  // Set in .env
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Set in .env
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
                values: [data],  // Data should be in an array format, for example: [email, uid]
            },
        });

        console.log('Data successfully appended to the Google Sheet');
    } catch (error) {
        console.error('Error appending data to Google Sheets:', error.message);
        throw new Error('Failed to append data to Google Sheets');
    }
}

// API handler for POST requests
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    // Extract email and UID from request body
    const { email, uid } = req.body;
    if (!email || !uid) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        // Call function to append data to Google Sheets
        await appendToGoogleSheet([email, uid]);

        // Send response indicating success
        res.status(200).json({ message: 'Data appended successfully' });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).send({ message: 'Failed to append data to Google Sheets' });
    }
}
