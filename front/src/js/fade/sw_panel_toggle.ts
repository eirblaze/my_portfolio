// eslint-disable-next-line no-unused-vars
import Panel from "./panel"

export default class {
    private Panel! : Panel
    private $SWPanelToggle! : JQuery

    readonly CSS = {
        Open : {
            padding: '10px'
        },
        Close : {
            padding: "0"
        }
    }

    constructor(i_Panel:Panel,i_css_SWPanelToggle:string|null) {

        // なければ何もせず終了。
        if (i_css_SWPanelToggle == null) {
            return
        }
        this.$SWPanelToggle = $(i_css_SWPanelToggle)
        if (this.$SWPanelToggle == null) {
            return
        }
        if (this.$SWPanelToggle.length < 1) {
            return
        }

        //init JQuery Object
        this.Panel = i_Panel

        // add events

        // 初期状態にする
        this.Panel.onInit( () => {
            this.$SWPanelToggle.css(this.CSS.Close)
        })

        // クリックしたらトグルをリクエスト
        this.$SWPanelToggle.on("click", () => {
            //console.log("sw panel toggle - click")
            this.Panel.reqToggle()
        })

        // パネルが開くイベント
        this.Panel.onOpen( () => {
            //console.log("panel Start to toggle")
            this.$SWPanelToggle
            .stop()
            .animate(this.CSS.Open, 500, 'swing')
        })

        // パネルが閉じるイベント
        this.Panel.onClose( () => {
            this.$SWPanelToggle
            .stop()
            .animate(this.CSS.Close, 500, 'swing')
        })

        // 有効になったとき
        this.Panel.onEnable( () => {
            this.$SWPanelToggle
            .show()
        })

        // 無効になったとき
        this.Panel.onDisable( () => {
            this.$SWPanelToggle
            .stop()
            .hide()
        })
    }
}