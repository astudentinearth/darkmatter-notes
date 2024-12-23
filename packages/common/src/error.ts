/** Error type to be used when a file is not in the expected format. */
export class InvalidFileFormatError extends Error {
  constructor(message: string){
    super(message);
  }
}


