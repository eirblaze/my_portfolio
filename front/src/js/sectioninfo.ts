export type CorrespJQ = {
  section : JQuery
  target : JQuery
}

type Corresp = {
  jq : CorrespJQ
  alive : boolean
  start : number
  end : number
}


export default class {

  private corresp : Corresp[] = new Array(0)

  constructor($i_corresp : CorrespJQ[]) {

    this.corresp_init($i_corresp)

    this.main()
    const $window = $(window)
    // resize()は$(window)のみ対応しています。
    $window.on("scroll resize", () => this.main() )
  }

  private main() {
    this.corresp_update()
    this.pos_compare()
  }

  private pos_compare() {

  }

  private corresp_init($i_corresp : CorrespInput) {
    for (let $i_member of $i_corresp ) {

      // 初期化
      let push_corresp:Corresp = {
        jq : $i_member,
        alive : false,
        start : 0,
        end : 0,
      }

      // 中身を更新
      push_corresp = this.corresp_update_single(push_corresp)

      // メンバーを反映
      this.corresp.push(push_corresp)
    }
    // console.log(this.$corresp)
  }

  private corresp_update_single(i_corresp:Corresp):Corresp {
    let return_corresp = i_corresp

    // 初期化
    return_corresp.alive = false
    return_corresp.start = 0
    return_corresp.end = 0

    // 有効判定
    if ( return_corresp.jq.section.length > 0
      && return_corresp.jq.target.length > 0
    ) {
      // 有効な時に初期化される
      return_corresp.alive = true
      return_corresp.start = return_corresp.jq.section.offset().top
      return_corresp.end = return_corresp.start + return_corresp.jq.section.height()
    }

    return return_corresp
  }

  private corresp_update() {
    this.corresp.forEach( member => {
      member = this.corresp_update_single(member)
    })
    console.log(this.corresp)
  }
}