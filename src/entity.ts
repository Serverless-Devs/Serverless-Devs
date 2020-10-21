export interface CommandType {
  type: string,
  message: string,
  name: string,
  default?: string,
  choices?: any
}
export interface InquirerCommand {
  [key: string]: CommandType;
}