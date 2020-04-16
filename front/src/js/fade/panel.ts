import EventStr from "./event_str"

export type Input = {
  css_panel:string
  obj_name:any
  css_clone_hide__pc:any
  css_clone_hide__sp?:any
}

export default class {

  private $Panel!: JQuery
  private $ClonedPanel!: JQuery
  private IsOpen = true
  private Enable = true
  private not_run = true
  private eventStr : any
  private css_clone_hide__pc : any
  private css_clone_hide__sp : any
  private is_pc : boolean|null = null
  readonly breakPoint = 1040

  readonly CSS = {
    OriginHide : {
      visibility: 'hidden',
      position: 'relative',
      zIndex: 0,
      overflow: "visible",
      transitionDuration: 0,
      backgroundColor: "transparent",
    },
    CloneCommon : {
      position: 'absolute',
      zIndex: 1,
      transitionDuration: ".8s",
      width: "100%",
      margin: 0,
    },
    CloneOpen : {
      top: 0,
      left: 0,
      visibility: "visible",
      opacity: 1,
      position: 'absolute',
    }
  }

  constructor(input : Input) {

    // パネル本体は必須。なければ何もせず終了。
    if (input.css_panel == null) {
      return
    }
    this.$Panel = $(input.css_panel)
    if (this.$Panel == null) {
      return
    }
    if (this.$Panel.length < 1) {
      return
    }
    this.not_run = false

    // input to member
    this.css_clone_hide__pc = input.css_clone_hide__pc
    this.css_clone_hide__sp = input.css_clone_hide__sp
    // if (input.css_clone_hide__sp == {}) {
    //   this.css_clone_hide__sp = this.css_clone_hide__pc
    // } else {
    //   this.css_clone_hide__sp = input.css_clone_hide__sp
    // }
    this.eventStr = EventStr(input.obj_name)

    // init Obj
    this.IsOpen = false

    // 初期状態になったとき
    this.$Panel.on(this.eventStr.Init, () => {

      if (this.IsOpen === true) {
        return
      }

      // クローン作成
      // console.log("Init")
      this.$ClonedPanel
      = this.$Panel
        .clone()
        .appendTo(this.$Panel)

      // 元の要素を加工
      this.$Panel
      .css(this.CSS.OriginHide)

      // クローン加工
      this.$ClonedPanel
      .css(this.CSS.CloneCommon)

      // 最初はPCのCSS
      this.$ClonedPanel
      .css(this.css_clone_hide__pc)
      this.is_pc = true
      // 次の段階で判定
      this.updatePcSp()

    })

    // パネルが開いたときのイベント
    this.$Panel.on(this.eventStr.Notify.Start, () => {
      // console.log("Open")
      this.$ClonedPanel
      .css(this.CSS.CloneOpen)
    })

    $(window).on("resize", () => {
      this.updatePcSp()
    })

    // 初期化完了時に通知する
    $(document).ready(() => {
      this.$Panel.trigger(this.eventStr.Init)
    })

  }

  // パネルを開くリクエスト
  public reqOpen() {
    if (this.IsOpen) {
      return
    }
    this.$Panel.trigger(this.eventStr.Notify.Start)
    this.IsOpen = true
  }

  public getOffset():number {
    return this.$Panel.offset().top
  }

  public is_run():boolean {
      return !this.not_run
  }

  public onInit( callback:Function ) {
    this.$Panel.on(this.eventStr.Init, callback )
  }
  public onOpen( callback:Function ) {
    this.$Panel.on(this.eventStr.Notify.Start, callback)
  }

  private updatePcSp() {
    if (this.IsOpen) {
      return
    }
    if ( $(window).width() > this.breakPoint ) {
      // Wide
      if (this.is_pc === true) {
        return
      }

      this.$ClonedPanel
      .css(this.css_clone_hide__pc)

      this.is_pc = true

    } else {
      // Std
      if (this.is_pc === false) {
        return
      }

      // console.log(this.css_clone_hide__sp)
      this.$ClonedPanel
      .css(this.css_clone_hide__sp)

      this.is_pc = false
    }
  }

}