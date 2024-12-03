import { google } from 'googleapis';

// Use your actual Google Sheet ID
const SHEET_ID = '1jdB9M8YOYjZEPL82sNNd6nBM74Q7AYnWE_--JoVnNww';
const SHEET_RANGE = 'Sheet1!A:B'; // This range can be adjusted as per your sheet

// Function to append data to Google Sheets
async function appendToGoogleSheet(data) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: 'hope-of-israel@hope-of-israel-442021.iam.gserviceaccount.com', // Your service email
            private_key: '4dfe63b511e0b5581095880ad698e71c22dd96e0', // Your private key
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: SHEET_RANGE,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [data], // Data should be an array, e.g., ['email@example.com', 'UID123']
        },
    });
}

// API route handler
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { email, uid } = req.body;
    if (!email || !uid) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        await appendToGoogleSheet([email, uid]);
        res.status(200).json({ message: 'Data appended successfully' });
    } catch (error) {
        console.error('Error appending data to Google Sheets:', error.message);
        res.status(500).send({ message: 'Failed to append data to Google Sheets' });
    }
}
