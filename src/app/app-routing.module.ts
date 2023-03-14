import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './public/components/register/register.component';
import { DashbordComponent } from './private/components/dashbord/dashbord.component';
import { AuthGuard } from './core/guards/auth.guard';
import { StockDataResolver } from './core/guards/stock-data.resolver';
import { HomeComponent } from './private/components/home/home.component';
import { AccountInfoComponent } from './private/components/profile/account-info/account-info/account-info.component';
import { ProfileSettingsComponent } from './private/components/profile/profile-settings/profile-settings.component';
import { ProfileComponent } from './private/components/profile/profile.component';
import { ValuationPageComponent } from './private/ui/valuation-page-ui/valuation-page.component';
import { PageNotFoundComponent } from './public/components/pageNotFound/page-not-found.component';
import { LoginComponent } from './public/components/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashbord', component:DashbordComponent,/* resolve:{Data:StockDataResolver}, */ children:[
    {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
    {path:'valuation',component:ValuationPageComponent},
    {path:'',redirectTo: 'home',pathMatch:'full'},
    {path:'profile', component:ProfileComponent, children:[
        { path: '', redirectTo: 'account-info', pathMatch: 'full' },
        {path:'account-info',component:AccountInfoComponent},
        {path:'profile-settings',component:ProfileSettingsComponent}
      ]},
      {path:'**',component:PageNotFoundComponent}
  ]},
  {path:'', redirectTo:'dashbord',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
