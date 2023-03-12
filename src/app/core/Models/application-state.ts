import { StockData } from "src/app/private/models/stock-data-series";
export type Userinfo={
  FullName:string;
  Linkedin?:string;
  Twitter?:string;
  Youtube?:string;
  Website?:string;
  About_me?:string;

}
export type StockDataState={
  price:number,
  companyName:string,
  ticker:string,
  date:Date,
  change:number
  series:StockData[]
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
export interface ApplicationState {
  UserCredentials:UserCredentials,
  Userinfo:Userinfo,
  UserStatus:UserStatus,
  StockData:StockDataState
}

