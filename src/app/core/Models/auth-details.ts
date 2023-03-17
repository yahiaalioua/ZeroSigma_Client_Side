export interface Payload{
  id:number,
  name:string,
  email:string
}
export interface AuthDetails{
  accessToken:string,
  payload:Payload,
  refreshToken:string
}
