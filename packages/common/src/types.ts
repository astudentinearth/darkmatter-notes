export type Result<T, E> =
  | { value: T; error?: undefined }
  | { value?: undefined; error: E };

export type FileImportResult = {
  /** Type of `content` field */
  type: "json" | "text" | "html",
  /** Contents to be imported */
  content: string
}