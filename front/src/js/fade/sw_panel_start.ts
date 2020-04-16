// eslint-disable-next-line no-unused-vars
import Panel from "./panel"

export default class {
    private Panel!: Panel
    private $SWPanelStart!: JQuery
    private eventStr : any

    constructor(i_Panel:Panel,i_css_SWPanelStart:string|null) {

        // なければ何もせず終了。
        if (i_css_SWPanelStart == null) {
            return
        }
        this.$SWPanelStart = $(i_css_SWPanelStart)
        if (this.$SWPanelStart == null) {
            return
        }
        if (this.$SWPanelStart.length < 1) {
            return
        }

        //init JQuery Object
        this.Panel = i_Panel

        // add events
        this.$SWPanelStart.on("click", () => {
            //console.log("sw panel Start - click")
            this.Panel.reqOpen()
        })
    }
}