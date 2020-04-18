// @see https://qiita.com/ryoutoku/items/b841cf156c9f68ae3e5b
// @see https://github.com/ryoutoku/vue-recaptcha-firebase/blob/master/src/components/reCAPTCHAUI.vue
import firebase from 'firebase/app'
import 'firebase/functions'
import GReCaptcha3 from "recaptcha-v3"

interface IReCAPTCHAResult {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": [];
  [key: string]: any;
}

export default async (front_key :string) => {
  let result: IReCAPTCHAResult = {
    success: false,
    score: 0,
    action: "",
    challenge_ts: "",
    hostname: "",
    "error-codes": []
  }
  let error = {}

  const grecaptcha3 = await GReCaptcha3.load(front_key)
  const token = await grecaptcha3.execute("homepage")

  const checkRecaptcha = firebase.functions().httpsCallable("checkRecaptcha")
  await checkRecaptcha({ token: token })
  .then(async response => {
    result = (await response.data) as IReCAPTCHAResult
    console.log("result",result)
  })
  .catch(error => {
    error = error;
    console.log("error",error)
  })
}