import * as functions from 'firebase-functions'
import * as express from 'express'
// import * as path from 'path'
import * as basicAuth from 'express-basic-auth'

const app = express()

// つかいかた : https://qiita.com/hiroyky/items/a16dc3315b06fd04c72a
// 型 : https://github.com/LionC/express-basic-auth/blob/master/express-basic-auth.d.ts
app.use(basicAuth({
  challenge: true,
  unauthorizedResponse: () => {
      return "Unauthorized" // 認証失敗時に表示するメッセージ
  },
  users: { someuser: "passstring" }
}))

// app.all() : https://expressjs.com/ja/4x/api.html#app.all
// app.use() : https://expressjs.com/ja/4x/api.html#app.use

// app.use(basicAuth({
//   users: { 'admin': 'supersecret' }
// }))

// app.all('/*', basicAuth({
//   users: { 'admin': 'supersecret' }
// }))

// app.use(express.static( path.resolve(__dirname + '/static/') ))

app.use('/', function (req, res) {
  res.send('Hello express from Firebase!')
})

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const mainPage = functions.https.onRequest(app)
// export const mainPage = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase !!!");
// })
