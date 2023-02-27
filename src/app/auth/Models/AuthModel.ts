export interface Payload{
  name:string,
  email:string
}
export interface AuthResponse{
  accessToken?:string,
  payload:Payload,
  refreshToken:string
}
