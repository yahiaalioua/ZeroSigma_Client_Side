import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/logic/login/login.component';
import { RegisterComponent } from './auth/feature/register/logic/register/register.component';
import { AuthGuard } from './core/Guards/auth.guard';
import { CalculateValueComponent } from './home/CalculateValueFeature/calculate-value/calculate-value.component';
import { HomeComponent } from './home/home.component';
import { AccountInfoComponent } from './home/profile/account-info/account-info/account-info.component';
import { ProfileSettingsComponent } from './home/profile/profile-settings/profile-settings.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ValuationPageComponent } from './home/ValuationPage/valuation-page/valuation-page.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:' ', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard],children:[
    {path:'',component:CalculateValueComponent},
    {path:'valuation',component:ValuationPageComponent},
    {path:'profile', component:ProfileComponent, children:[
      { path: '', redirectTo: 'account-info', pathMatch: 'full' },
      {path:'account-info',component:AccountInfoComponent},
      {path:'profile-settings',component:ProfileSettingsComponent}
    ]}
  ]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
