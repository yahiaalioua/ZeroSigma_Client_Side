export interface localStorageState{
  accessToken?:string,
  payload:Payload,
  refreshToken:string
}
export interface Payload{
  id:number|undefined,
  name:string,
  email:string
}
