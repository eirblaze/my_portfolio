import Panel, {Input} from "./fade/panel"
import SWScroll from "./fade/sw_scroll"

export type PanelInput = Input

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

    private _Panel      : Panel
    private _SWScroll  : SWScroll|null = null

    constructor(
        input : Input
    ) {

        // init Objects
        this._Panel = new Panel(input)

        // 本体が動いてなければ何もせず終了。
        if (!this._Panel.is_run()) {
            return
        }

        this._SWScroll = new SWScroll(this._Panel)
    }

}