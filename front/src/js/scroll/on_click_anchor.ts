import anchor_scroll from "./anchor_scroll"
import get_offset from "./get_offset"

export default ():void => {

  $('a[href^="#"]').on( "click", (event:JQuery.ClickEvent) => {

    const href = $(event.currentTarget).attr("href")

    let $target
    if ( href === undefined || href == "#" || href == "") {
      $target = $("html")
    } else {
      $target = $(href)
    }

    // リンク先に飛ばなくなる
    event.preventDefault()

    // 親フレームが有効な場合
    let $frame = $('body,html', parent.document)
    if ($frame.length < 1) {
      // 親フレームが無効な場合
      $frame = $('body,html')
    }

    // スクロールアニメーション
    anchor_scroll(
      $frame,
      get_offset( $target )
    )
  })

}