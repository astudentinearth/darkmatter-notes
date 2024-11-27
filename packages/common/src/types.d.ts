export type Result<T, E> =
  | { value: T; error?: undefined }
  | { value?: undefined; error: E };
