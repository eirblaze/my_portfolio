import on_click_anchor from "./scroll/on_click_anchor"

export default () => {
  jQmain(jQuery)
}

function jQmain($:JQueryStatic) {
  $(document).ready( () => {
    on_click_anchor()
  })
}
