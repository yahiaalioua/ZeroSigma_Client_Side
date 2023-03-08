export type Userinfo={
  FullName:string;
  Linkedin?:string;
  Twitter?:string;
  Youtube?:string;
  Website?:string;
  About_me?:string;

}
export type UserCredentials={
  id:number|undefined;
  email:string|undefined;
  fullName:string
}
export type UserStatus={
  isLoggedIn:boolean;
  isLoggedOut:boolean
}
export interface UserState {
  UserCredentials:UserCredentials;
  Userinfo:Userinfo;
  UserStatus:UserStatus
}

