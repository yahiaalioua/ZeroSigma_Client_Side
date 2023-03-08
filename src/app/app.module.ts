import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/feature/register/logic/register/register.component';
import { LoginComponent } from './auth/feature/login/logic/login/login.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/feature/login/ui/login-form/login-form.component';
import { RegisterFormComponent } from './auth/feature/register/ui/registerForm/register-form/register-form.component';
import { NavBarContainerCompComponent } from './home/navbar/logic/nav-bar-container-comp/nav-bar-container-comp.component';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './home/profile/profile.component';
import { SideBarComponent } from './home/profile/sideBar/side-bar/side-bar.component';
import { AccountInfoComponent } from './home/profile/account-info/account-info/account-info.component';
import { ProfileSettingsComponent } from './home/profile/profile-settings/profile-settings.component';
import { ResetEmailComponent } from './home/profile/reset-email/reset-email.component';
import { DelateAccountComponent } from './home/profile/delateAccount/delate-account/delate-account.component';
import { ValuationPageComponent } from './home/ValuationPage/valuation-page/valuation-page.component';
import { CalculateValueComponent } from './home/CalculateValueFeature/calculate-value/calculate-value.component';
import { DisplayValuationComponent } from './home/CalculateValueFeature/calculate-value/display-valuation/display-valuation.component';
import { StockGraphComponent } from './home/CalculateValueFeature/calculate-value/stock-graph/stock-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './Shared/Pipes/search.pipe';
import { DatePipe } from '@angular/common';
import { SearchSmartComponent } from './home/CalculateValueFeature/SearchFeature/logic/search-smart.component';
import { SearchUIComponent } from './home/CalculateValueFeature/SearchFeature/ui/search-ui.component';
import { CustomErrorHandlerService } from './core/Errors/custom-error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastComponent } from './Shared/Dialogs/Toaster/toast/toast.component';
import { SpinnerComponent } from './Shared/Spinner/spinner/spinner.component';
import { DashbordComponent } from './core/Components/dashbord.component';







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
  providers:[DatePipe,{
    provide:ErrorHandler,
    useClass:CustomErrorHandlerService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
