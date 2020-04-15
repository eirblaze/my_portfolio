import * as functions from 'firebase-functions'
import * as express from 'express'
import * as path from 'path'
// import * as basicAuth from 'express-basic-auth'

const app = express()

app.all('/*', function (req, res) {
  res.send('Hello express from Firebase!')
})

// app.use(basicAuth({
//   users: { 'admin': 'supersecret' }
// }))

// app.all('/*', basicAuth({
//   users: { 'admin': 'supersecret' }
// }))

app.use(express.static( path.resolve(__dirname + '/static/') ))

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// export const mainPage = functions.https.onRequest(app)
export const mainPage = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!!");
})
