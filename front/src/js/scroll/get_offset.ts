import get_header_height from "./get_header_height"

// リンク先のアンカーから位置を検出
export default ($target:JQuery):number => {

  // console.log($target.length)
  if ($target.length < 1) {
    return 0
  }

  // undefined対策しつつ、オフセットを取得する。
  const _offset = $target.offset()
  if (_offset === undefined ) {
    return 0
  }
  let r_offset = _offset.top

  // ヘッダーサイズを反映
  // r_offset -= get_header_height($("header"))

  // マイナスの値は出力しない
  if ( r_offset < 0 ) {
    r_offset = 0
  }

  // console.log(r_offset)
  return r_offset
}
