import Sectioninfo from "./sectioninfo"
import SPMenuButton from "./sp-menu-button"
import scroll from "./scroll"
import Fade from "./fade"
// import firebase_example from "./example"

// import '../pug/hello-pug.pug'
// import '../pug/example.pug'
import '../pug/reset-preview.pug'
import '../pug/index.pug'

import "../sass/index.sass"

// firebase_example("#load")

const sectioninfo = new Sectioninfo([
  {
    section: $("p"),
    target: $("a"),
  },
])

const _SPMenuButton: SPMenuButton[] = new Array(0)
_SPMenuButton.push( new SPMenuButton({
  obj_name : "sp_menu",
  css_panel : ".sp-menu-panel",
  css_sw_panel_toggle : ".sp-menu-toggle"
}))

scroll()

const _fade: Fade[] = new Array(0)
_fade.push(new Fade({
  css_panel: ".section1",
  obj_name: "section1",
  css_clone_hide__pc: {},
  css_clone_hide__sp: {}
}))
