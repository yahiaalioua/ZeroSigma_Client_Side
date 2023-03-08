export interface Payload{
  id:number,
  name:string,
  email:string
}

export interface CachedUserAuthDetails{
  accessToken?:string,
  payload:Payload,
  refreshToken:string
}
