export interface Embed {
  id: string;
  /** The name which the user will see. It's usually the original filename. */
  displayName: string;
  /** The actual filename of the embed inside the storage medium. */
  filename: string;
  /** Size of the file in bytes. */
  fileSize: number;
  createdAt: Date;
}

export interface ResolvedEmbed extends Embed {
  /** An URI pointing directly to the embedded resource. */
  uri: string;
}
