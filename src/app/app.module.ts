import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './private/components/home/home.component';
import { RegisterComponent } from './public/components/register/register.component';

import { PageNotFoundComponent } from './public/components/pageNotFound/page-not-found.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './public/ui/login-ui/login-form.component';
import { RegisterFormComponent } from './public/ui/register-ui/register-form.component';
import { NavBarContainerCompComponent } from './private/components/navbar-container/nav-bar-container-comp.component';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './private/components/profile/profile.component';
import { SideBarComponent } from './private/components/profile/sideBar/side-bar/side-bar.component';
import { AccountInfoComponent } from './private/components/profile/account-info/account-info/account-info.component';
import { ProfileSettingsComponent } from './private/components/profile/profile-settings/profile-settings.component';
import { ResetEmailComponent } from './private/components/profile/reset-email/reset-email.component';
import { DelateAccountComponent } from './private/components/profile/delateAccount/delate-account/delate-account.component';
import { ValuationPageComponent } from './private/ui/valuation-page-ui/valuation-page.component';
import { CalculateValueComponent } from './private/components/calculate-value/calculate-value.component';
import { DisplayValuationComponent } from './private/ui/display-valuation-ui/display-valuation.component';
import { StockGraphComponent } from './private/ui/stock-graph-ui/stock-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchPipe } from './shared/pipes/search.pipe';
import { DatePipe } from '@angular/common';
import { SearchSmartComponent } from './private/components/search-smart-component/search-smart.component';
import { SearchUIComponent } from './private/ui/search-ui/search-ui.component';
import { CustomErrorHandlerService } from './core/errors/custom-error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastComponent } from './shared/components/toast/toast.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { DashbordComponent } from './private/components/dashbord/dashbord.component';
import { NavBarComponent } from './private/ui/nav-bar-ui/nav-bar.component';
import { LoginComponent } from './public/components/login/login.component';
import { SessionInterceptor } from './core/services/session.interceptor';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NavBarContainerCompComponent,
    ProfileComponent,
    SideBarComponent,
    AccountInfoComponent,
    ProfileSettingsComponent,
    ResetEmailComponent,
    DelateAccountComponent,
    ValuationPageComponent,
    CalculateValueComponent,
    DisplayValuationComponent,
    StockGraphComponent,
    SearchPipe,
    SearchSmartComponent,
    SearchUIComponent,
    ToastComponent,
    SpinnerComponent,
    DashbordComponent,
    NavBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    NoopAnimationsModule,
    FormsModule,
    NgApexchartsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule

  ],
  providers:[
    DatePipe,{
    provide:ErrorHandler,
    useClass:CustomErrorHandlerService,
  },
  {provide:HTTP_INTERCEPTORS,useClass:SessionInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
