import Panel from "./panel"

export default class {
    private Panel!: Panel
    private $SWPanelStart!: JQuery
    private eventStr : any

    constructor(i_Panel: Panel,i_css_SWPanelStart:string|undefined) {

        // なければ何もせず終了。
        if (i_css_SWPanelStart == undefined) {
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