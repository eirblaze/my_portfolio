// eslint-disable-next-line no-unused-vars
import Panel from "./panel"

export default class {
    private Panel! : Panel
    private $window = $(window)
    readonly offset = 40

    constructor(i_Panel:Panel) {

        //init JQuery Object
        this.Panel = i_Panel

        // add events

        // 読み込み
        $(document).ready( () => {
            this.scroll_open()
        })

        // scroll,resize
        this.$window.on('scroll resize', () => {
            this.scroll_open()
        })

    }

    private scroll_open() {
      // console.clear
      // console.log(`this.Panel.getOffset().top : ${this.Panel.getOffset().top}`)
      // console.log(`this.$window.scrollTop() : ${this.$window.scrollTop()}`)
      // console.log(`this.$window.height() : ${this.$window.height()}`)
      if ( this.$window.scrollTop() + (this.$window.height() / 4 * 3) > this.Panel.getOffset() ) {
          this.Panel.reqOpen()
      }
    }
}