import EventStr from "./event_str"

export default class Panel {

  private $Panel!: JQuery
  private IsOpen = true
  private Enable = true
  private not_run = true
  private eventStr : any

  // コンストラクタ
  constructor(i_css_panel:string, i_obj_name:string) {

    // パネル本体は必須。なければ何もせず終了。
    if (i_css_panel === undefined) {
      return
    }
    this.$Panel = $(i_css_panel)
    if (this.$Panel == null) {
      return
    }
    if (this.$Panel.length < 1) {
      return
    }
    this.not_run = false

    // event str
    this.eventStr = EventStr(i_obj_name)

    // 初期状態にする
    this.$Panel.on(this.eventStr.Init, () => {
      this.$Panel.hide()
      this.IsOpen = false
    })

    // パネルが開いたときのイベント
    this.$Panel.on(this.eventStr.Notify.Start, () => {
      this.$Panel.slideDown()
    })

    // パネルが閉じたときのイベント
    this.$Panel.on(this.eventStr.Notify.End, () => {
      this.$Panel.slideUp()
    })

    // 有効になったとき
    this.$Panel.on(this.eventStr.Notify.Enabled, () => {
      this.$Panel
      .hide()
    })

    // 無効になったとき
    this.$Panel.on(this.eventStr.Notify.Disabled, () => {
      this.$Panel
      .stop()
      .show()
    })

    // 初期化完了時に通知する
    this.$Panel.trigger(this.eventStr.Init)

  }


  // パネル開閉トグルのイベント。開閉に変換する。
  public reqToggle() {
    if (this.IsOpen) {
      this.reqClose()
    } else {
      this.reqOpen()
    }
  }

  // パネルを開くリクエスト
  public reqOpen() {
    if (this.IsOpen) {
      return
    }
    this.$Panel.trigger(this.eventStr.Notify.Start)
    this.IsOpen = true
  }

  // パネルを閉じるリクエスト
  public reqClose() {
    if (!this.IsOpen) {
      return
    }
    this.$Panel.trigger(this.eventStr.Notify.End)
    this.IsOpen = false
  }

  public reqEnable() {
    if (this.Enable) {
        return
    }
    this.$Panel
    .addClass(`${this.eventStr.Label.Alive.Prefix}${this.eventStr.Label.Alive.Unique}`)
    .trigger(this.eventStr.Notify.Enabled)
    this.Enable = true
  }

  public reqDisable() {
    if (!this.Enable) {
        return
    }
    this.$Panel
    .removeClass(`${this.eventStr.Label.Alive.Prefix}${this.eventStr.Label.Alive.Unique}`)
    .trigger(this.eventStr.Notify.Disabled)

    this.Enable = false

    // 他の有効ラベルが貼られていた場合は、処理を中止する。
    if ( this.hasClassPart(this.$Panel, this.eventStr.Label.Alive.Prefix) ) return

    this.$Panel
    .stop()
    .show()

  }


  /**
   * jQueryで複数指定のあるclassを取得する方法
   * @see http://cly7796.net/wp/javascript/get-a-class-with-multiple-specifications-with-jquery/
   */
  private hasClassPart($jQ: JQuery, i_str:string):boolean {

    const class_str = $jQ.attr('class') // classの値を取得
    if ( class_str === undefined ) {
      return false
    }
    const class_array = class_str.split(' ') // 取得した値を分割

    // 配列になっているのでforで一つずつ取得できる

    let r_match = false
    for(const class_value of class_array) { // オブジェクトの中のプロパティ名を取り出す。
      if ( class_value != '' && class_value.indexOf(i_str) != -1 ) {
        r_match = true
        break
      }
    }

    // console.info(r_match)
    return r_match

  }

  public is_run():boolean {
      return !this.not_run
  }

  // クライアントコード側からイベント登録
  public onInit( callback:Function ) {
    this.$Panel.on(this.eventStr.Init, callback )
  }
  public onOpen( callback:Function ) {
    this.$Panel.on(this.eventStr.Notify.Start, callback)
  }
  public onClose( callback:Function ) {
    this.$Panel.on(this.eventStr.Notify.End, callback)
  }
  public onEnable( callback:Function ) {
    this.$Panel.on(this.eventStr.Notify.Enabled, callback)
  }
  public onDisable( callback:Function ) {
    this.$Panel.on(this.eventStr.Notify.Disabled, callback)
  }

}