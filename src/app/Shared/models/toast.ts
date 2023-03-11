
export interface Toastdata{
  Title:string,
  Message:string,
  Type:'Success'|'Error'|'Warning'|'Info',
  Duration?:number,
  Show:boolean
}
