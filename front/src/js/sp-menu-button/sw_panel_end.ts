import Panel from "./panel"

export default class {
    private Panel!: Panel
    private $SWPanelEnd!: JQuery

    constructor(i_Panel:Panel,i_css_SWPanelEnd:string|undefined) {

        // なければ何もせず終了。
        if (i_css_SWPanelEnd == undefined) {
            return
        }
        this.$SWPanelEnd = $(i_css_SWPanelEnd)
        if (this.$SWPanelEnd == null) {
            return
        }
        if (this.$SWPanelEnd.length < 1) {
            return
        }

        this.Panel = i_Panel

        // add events
        this.$SWPanelEnd.on("click", () => {
            //console.log("sw panel End - click")
            this.Panel.reqClose()
        })
    }
}