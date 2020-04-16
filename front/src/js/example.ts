export default function (css_sel:string) {
  const $target = $(css_sel)
  if ( $target.length < 1 ) return

  $target.on("click", (event) => {
    $(event.currentTarget)
    .append("<span>aaa</span>")
    .css({
      backgroundColor: "#0f49c4",
      color: "#ECECFC",
    })
  })
}
