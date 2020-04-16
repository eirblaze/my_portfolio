type CorrespJQ = {
  section : JQuery
  target : JQuery
}

export type CorrespInput = Array<CorrespJQ>

type Corresp = {
  jq : CorrespJQ
  alive : boolean | undefined
  offsetTtop : number | undefined
}


export default class {

  private corresp : Corresp[] = new Array(0)

  constructor($i_corresp : CorrespInput) {

    this.corresp_init($i_corresp)

    this.main()
    const $window = $(window)
    // resize()は$(window)のみ対応しています。
    $window.on("resize", () => this.main() )
    $window.on("scroll", () => this.main() )
  }

  private main() {
    this.pos_compare()
  }

  private pos_compare() {

  }

  private corresp_init($i_corresp : CorrespInput) {
    for (let $i_member of $i_corresp ) {

      // 初期化
      let push_corresp = {
        jq : $i_member,
        alive : false,
        offsetTtop : 0
      }

      // 有効判定
      if ( push_corresp.jq.section.length < 1
        && push_corresp.jq.target.length < 1
      ) {
        // 有効な時に初期化される
        push_corresp.alive = true
        push_corresp.offsetTtop = push_corresp.jq.section.offset().top
      }

      // メンバーを反映
      this.corresp.push(push_corresp)
    }
    // console.log(this.$corresp)
  }
}