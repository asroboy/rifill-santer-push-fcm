import express from 'express';
import admin from 'firebase-admin';
import { getMessaging } from "firebase-admin/messaging";
import serviceAccountSanter from './config/firebaseConfig.json'  with { type: 'json' };
import serviceAccount from './config/ecampus-mobile-dev-firebase-adminsdk-lq07e-cd95b3e397.json'  with { type: 'json' };
// import serviceAccount from './config/santer-93c5b-firebase-adminsdk-fbsvc-5c555bc105.json'  with { type: 'json' };
// const serviceAccountSanter = await import('./santer-93c5b-firebase-adminsdk-fbsvc-5c555bc105.json', { with: { type: 'json' } });


const app = express();
const port = 3000; // Or any preferred port



// const serviceAccount = require('./santer-93c5b-firebase-adminsdk-fbsvc-5c555bc105.json');

const appYtb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

}, 'firebaseYtb');

const appSanter = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountSanter),
}, 'firebaseSanter');



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

    const messageBody = req.body; // Access data from the request body

    console.log(messageBody);
    console.log(messageBody.kode);

    const message = {
        data: messageBody.data,
        notification: messageBody.notification,
        token: messageBody.token
    }

    if (messageBody != null) {
        if (messageBody == 'santer') {
            sendMessage(appSanter, message, res);
        } else {
            sendMessage(appYtb, message, res);
        }
    } else {
        sendMessage(appYtb, message, res);
    }


});

function sendMessage(appFirebase, message, res) {
    appFirebase.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            const msg = {
                "success": true,
                "messageId": response
            }
            res.json(msg);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            const msg = {
                "success": false,
                "messageId": error.message
            }
            res.json(msg);
        });
}


function sendMessageMultiple(appFirebase, message, res) {
    appFirebase.messaging().sendEachForMulticast(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Multicast notification sent:', response);
            res.json(response);
        })
        .catch((error) => {
            console.log('Error sending multicast notification:', error);
            res.json(error);
        });
}


app.post('/push_multiple_devices', (req, res) => {

    const messageBody = req.body; // Access data from the request body

    console.log(messageBody);
    console.log(messageBody.kode);

    const message = {
        data: messageBody.data,
        notification: messageBody.notification,
        tokens: messageBody.tokens
    }

    if (message.kode !== null) {
        if (message.kode === 'santer') {
            sendMessageMultiple(appSanter, message, res);
        } else {
            sendMessageMultiple(appYtb, message, res);
        }
    } else {
        sendMessageMultiple(appYtb, message, res);
    }




});


// Start the server
app.listen(port, () => {
    console.log(`Web service listening at http://localhost:${port}`);
});

