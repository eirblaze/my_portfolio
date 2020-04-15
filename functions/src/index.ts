import * as functions from 'firebase-functions'
import * as express from 'express'
import * as basicAuth from 'express-basic-auth'

const app = express()

// つかいかた : https://qiita.com/hiroyky/items/a16dc3315b06fd04c72a
// 型 : https://github.com/LionC/express-basic-auth/blob/master/express-basic-auth.d.ts
app.use('/*', basicAuth({
  challenge: true,
  unauthorizedResponse: () => {
      return "Unauthorized" // 認証失敗時に表示するメッセージ
  },
  users: {
    eirblaze: "AkIR4BxP",
    guest: "J2eQpIcX",
  }
}))

// app.all() : https://expressjs.com/ja/4x/api.html#app.all
// app.use() : https://expressjs.com/ja/4x/api.html#app.use
app.use( express.static('./static',{
  setHeaders: (res, path) => {
    res.setHeader("X-Robots-Tag", "noindex");
  }
}))

app.use(function(req, res, next) {
  res.status(404).redirect('/404.html')
})

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const mainPage = functions.https.onRequest(app)
