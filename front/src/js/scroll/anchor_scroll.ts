// 特定の位置までスクロールさせる
export default ($target:JQuery,i_offset:number) => {
  jQmain(jQuery,$target,i_offset)
}

function jQmain($:JQueryStatic,$target:JQuery,i_offset:number) {

  console.log(i_offset)

  $target
  .animate({
    scrollTop: i_offset
  }, 800, 'swing')

}
