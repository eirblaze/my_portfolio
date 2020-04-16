import Panel from "./sp-menu-button/panel"
import SW_PanelToggle from "./sp-menu-button/sw_panel_toggle"
import SW_PanelStart from "./sp-menu-button/sw_panel_start"
import SW_PanelEnd from "./sp-menu-button/sw_panel_end"
import Responsive from "./sp-menu-button/responsive"

export type Input = {
    obj_name             : string
    css_panel            : string
    enable_min_width?    : number
    enable_max_width?    : number
    css_sw_panel_toggle? : string
    css_sw_panel_start?  : string
    css_sw_panel_end?    : string
}

export default class {
    //todo

    // input css selector
    //パネル本体
    //スイッチ：パネルトグル
    //スイッチ：パネル終了
    //スイッチ：パネル開始
    //欄外のエレメント
    //レスポンシブによる隠し解除条件解像度
    //スクロールロック

    private Panel           : Panel
    private SW_PanelToggle  : SW_PanelToggle|null = null
    private SW_PanelStart   : SW_PanelStart|null = null
    private SW_PanelEnd     : SW_PanelEnd|null = null
    private Responsive      : Responsive|null = null

    constructor(input : Input) {

        // init Objects
        this.Panel = new Panel(input.css_panel, input.obj_name)

        // 本体が動いてなければ何もせず終了。
        if (!this.Panel.is_run) {
            return
        }

        this.SW_PanelToggle = new SW_PanelToggle(this.Panel,input.css_sw_panel_toggle)
        this.SW_PanelStart = new SW_PanelStart(this.Panel,input.css_sw_panel_start)
        this.SW_PanelEnd = new SW_PanelEnd(this.Panel,input.css_sw_panel_end)
        this.Responsive = new Responsive(this.Panel,input.enable_min_width, input.enable_max_width)

        console.log("ready for SP menu button")
    }

    public enable() :void {
        this.Panel.reqEnable()
    }

    public disable() :void {
        this.Panel.reqDisable()
    }
}