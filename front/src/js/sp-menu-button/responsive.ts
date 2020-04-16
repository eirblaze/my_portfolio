// eslint-disable-next-line no-unused-vars
import Panel from "./panel"

export default class {

  private Panel : Panel
  private enable_max_width : number|undefined
  private enable_min_width : number|undefined

  private $body! : JQuery

  constructor(
    i_Panel:Panel,
    i_enable_min_width  : number|undefined,
    i_enable_max_width  : number|undefined
  ) {

    this.Panel = i_Panel

    // 無効にする解像度を記録
    this.enable_max_width = i_enable_max_width
    this.enable_min_width = i_enable_min_width

    //// メニューボタン機能を横解像度に応じて有効にしたり無効にしたり。
    if (
      this.enable_max_width != undefined
      || this.enable_min_width != undefined
    ) {

      // event: ready
      $(document).ready(() => {

        this.$body = $("body")
        this.sp_menu_responsive()

        // event: resize
        $(window).resize( () => {
          this.sp_menu_responsive()
        })

      })

    }
  }

  private sp_menu_responsive() {
    // console.log(`screen.width = ${window.screen.width}`) // window.screen.widthはPCではモニターの解像度(横方向のピクセル数)を返す。
    // console.log(`screen.availWidth = ${window.screen.availWidth}`)
    // console.log(`$("body").width() = ${this.$body.width()}`)

    const body_width = this.$body.width()
    if ( body_width === undefined ) {
      return
    }

    if ( this.enable_max_width != undefined ){
      if (body_width <= this.enable_max_width) {
        this.Panel.reqEnable()
      } else {
        this.Panel.reqDisable()
      }
    }

    if ( this.enable_min_width != undefined ){
      if (body_width >= this.enable_min_width) {
        this.Panel.reqEnable()
      } else {
        this.Panel.reqDisable()
      }
    }

  }


}