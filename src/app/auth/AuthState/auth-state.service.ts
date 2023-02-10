import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/core/facades/user-facade.service';
import { UserStatus } from 'src/app/state/stateInterfaces/user-state';
import { StoreService } from 'src/app/state/store.service';
import { login } from '../feature/login/interfaces/loginInterface';
import { register } from '../feature/register/Interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService  {

  invalidLoginMessage:string=''

  userStatus:Observable<UserStatus>=this.store.UserState$.pipe(map(state=>state.UserStatus));
  isLoggedIn$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedIn));
  isLoggedOut$:Observable<boolean>=this.userStatus.pipe(map(status=>status.isLoggedOut));



  constructor(private router:Router,private store:StoreService) {}

  generateToken(){
    let chars :any= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let token :string[]= [];
    for (let i=0; i<100; i++) {
        let j = (Math.random() * (chars.length-1)).toFixed(0);
        token[i] = chars[j];
    }
    return token.join("");
  }
  Register({name,email,password}:register){
    let details:register={name,email,password}
    localStorage.setItem('details',JSON.stringify(details))
    this.router.navigateByUrl('/login')
  }
  Login({email,password}:login){
    let userdetails:any=localStorage.getItem('details');
    userdetails=JSON.parse(userdetails);

    if(userdetails){
      if(email===userdetails.email && password===userdetails.password){
        localStorage.setItem('token',this.generateToken())
        this.store.setState({...this.store.currentState, UserStatus:{isLoggedIn:true,isLoggedOut:false},
          UserCredentials:{email:userdetails.email,password:userdetails.password,fullName:userdetails.name}
        });
        this.router.navigateByUrl('/home');
      }
    }
    else{
      console.warn('register first')
      this.invalidLoginMessage='Invalid user, make sure to register first'
    }
  }
  logout(){
    localStorage.removeItem('details')
    localStorage.removeItem('token')
    this.store.setState({...this.store.currentState, UserStatus:{isLoggedIn:false,isLoggedOut:true}});
    this.router.navigate(['/login'])
  }
  checkState(){
    let userdetails:any=localStorage.getItem('details');
    userdetails=JSON.parse(userdetails);
    let token:any=localStorage.getItem('token')
    if(token){
      this.store.setState({...this.store.currentState, UserStatus:{isLoggedIn:true,isLoggedOut:false},
        UserCredentials:{email:userdetails.email,password:userdetails.password,fullName:userdetails.name}})

    }
    else return
  }
}
