/**
 * Constant names for use with IPC
 */
export enum ChannelNames {
  CREATE_NOTE = "create-note",
  SET_JSON_CONTENT = "set-json-content",
  GET_JSON_CONTENT = "get-json-content",
  DELETE_NOTE = "delete-note",
  MOVE_NOTE = "move-note",
  UPDATE_NOTE = "update-note",
  GET_ALL_NOTES = "get-all-notes",
  SET_TRASH_STATUS = "set-trash-status",
  SAVE_USER_PREFS = "save-user-settings",
  LOAD_USER_PREFS = "load-user-settings",
  GET_NOTE = "get-note",
  SAVE_NOTES = "save-notes",
  EXPORT_NOTE = "export-note",
  IMPORT_HTML = "import-html",
  SHOW_APP_MENU = "show-app-menu",
}
