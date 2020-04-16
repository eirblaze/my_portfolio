import Sectioninfo from "./sectioninfo"
import scroll from "./scroll"
import Fade from "./fade"

import "../sass/index.sass"

const sectioninfo = new Sectioninfo([
  {
    section: $("p"),
    target: $("span"),
  },
])

scroll()
const _fade: Fade[] = new Array(0)
_fade.push(new Fade({
  css_panel: ".section1",
  obj_name: "section1",
  css_clone_hide__pc: {},
  css_clone_hide__sp: {}
}))
