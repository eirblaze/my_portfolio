// @see https://qiita.com/ryoutoku/items/b841cf156c9f68ae3e5b
// @see https://github.com/ryoutoku/vue-recaptcha-firebase/blob/master/src/components/reCAPTCHAUI.vue
import firebase from 'firebase/app'
import 'firebase/functions'
import {load} from "recaptcha-v3"

interface IReCAPTCHAResult {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": [];
  [key: string]: any;
}

export default class {

  private result: IReCAPTCHAResult = {
    success: false,
    score: 0,
    action: "",
    challenge_ts: "",
    hostname: "",
    "error-codes": []
  }
  private error = {}

  private token:string = ""

  constructor(siteKey:string) {
    this.init(siteKey)
  }

  private async init(siteKey:string) {
    const ReCaptchaInstance = await load(siteKey)
    this.token = await ReCaptchaInstance.execute("homepage")
    console.log("token",this.token)
    $(".recaptcha_result").text(this.token)
  }

  public async verify() {

    $(".recaptcha_result").text("Loading...")
    const checkRecaptcha = firebase.functions().httpsCallable("checkRecaptcha")
    await checkRecaptcha({ token: this.token })
    .then(async response => {
      console.log("response",response)
      $(".recaptcha_result").text("OK")
      this.result = (await response.data) as IReCAPTCHAResult
      // console.log("result",this.result)
    })
    .catch(error => {
      $(".recaptcha_result").text("Error")
      this.error = error;
      console.log("error",this.error)
    })
  }
}