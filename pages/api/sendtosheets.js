import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_RANGE = 'Sheet1!A:B'; // Adjust range as needed for your sheet

async function appendToGoogleSheet(data) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
