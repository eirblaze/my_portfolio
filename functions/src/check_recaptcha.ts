import * as functions from 'firebase-functions'
import * as rp from 'request-promise'
import recaptcha_key from './secret/reCAPTCHA_key'

export default (req:functions.https.Request, res:functions.Response) => {
    // res.send("Recaptcha")
    // console.log("recaptcha req", req)
    console.log("recaptcha req.query", req.query)
    const response = req.query.response
    if (response === undefined) return

    console.log("recaptcha response", response)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: recaptcha_key,
            response: response
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result)
        if (result.success) {
            res.send("You're good to go, human.")
        }
        else {
            res.send("Recaptcha verification failed. Are you a robot?")
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.send("Recaptcha request failed.")
    })
}