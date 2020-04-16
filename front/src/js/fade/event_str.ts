export default (obj_name:string) => ({
  Init : `ev_init_panels__${obj_name}`,
  Notify : {
    Start : `ev_notify_panel_start__${obj_name}`,
    End : `ev_notify_panel_end__${obj_name}`,
    Enabled : `ev_notify_enabled__${obj_name}`,
    Disabled : `ev_notify_disabled__${obj_name}`,
  },
  Label : {
    Alive : {
      Common : `sp_btn__alive`,
      Unique : `sp_btn__alive__${obj_name}`,
    },
  },
})