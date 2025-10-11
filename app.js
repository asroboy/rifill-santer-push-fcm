import express from 'express';
import admin from 'firebase-admin';
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from './config/firebaseConfig.json'  with { type: 'json' };
// const serviceAccount = await import('./santer-93c5b-firebase-adminsdk-fbsvc-5c555bc105.json', { with: { type: 'json' } });


const app = express();
const port = 3000; // Or any preferred port



// const serviceAccount = require('./santer-93c5b-firebase-adminsdk-fbsvc-5c555bc105.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



// module.exports = messaging;


// Middleware to parse JSON request bodies
app.use(express.json());

// Define a basic route for GET requests
app.get('/', (req, res) => {
    res.send('Hello from your Node.js Web Service!');
});


// Define a route for a simple API endpoint
app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is some data from your API',
        timestamp: new Date().toISOString()
    };
    res.json(data); // Send JSON response
});



// Define a route for POST requests
app.post('/push', (req, res) => {

    const message = req.body; // Access data from the request body

    // const message = {
    //     data: {
    //         score: '850',
    //         time: '2:45'
    //     },
    //     token: registrationToken
    // };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            res.json(response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            res.json(error);
        });


});



app.post('/push_multiple_devices', (req, res) => {

    const message = req.body; // Access data from the request body

    // const message = {
    //     data: {
    //         score: '850',
    //         time: '2:45'
    //     },
    //     token: registrationToken
    // };

    admin.messaging().sendMulticast(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Multicast notification sent:', response);
            res.json(response);
        })
        .catch((error) => {
            console.log('Error sending multicast notification:', error);
            res.json(error);
        });


});


// Start the server
app.listen(port, () => {
    console.log(`Web service listening at http://localhost:${port}`);
});


// // This registration token comes from the client FCM SDKs.
// const registrationToken = 'YOUR_REGISTRATION_TOKEN';


// // Send a message to the device corresponding to the provided
// // registration token.
