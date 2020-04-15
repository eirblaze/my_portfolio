import * as functions from 'firebase-functions'
import * as express from 'express'
import * as basicAuth from 'express-basic-auth'

const app = express()

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}))

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
