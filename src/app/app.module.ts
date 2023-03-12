import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './private/components/home/home.component';
import { RegisterComponent } from './public/components/register/logic/register.component';
import { LoginComponent } from './public/components/login/logic/login.component';
import { PageNotFoundComponent } from './public/components/pageNotFound/page-not-found.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './public/components/login/ui/login-form.component';
import { RegisterFormComponent } from './public/components/register/ui/register-form.component';
import { NavBarContainerCompComponent } from './private/components/navbar-container/nav-bar-container-comp.component';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './private/components/profile/profile.component';
import { SideBarComponent } from './private/components/profile/sideBar/side-bar/side-bar.component';
import { AccountInfoComponent } from './private/components/profile/account-info/account-info/account-info.component';
import { ProfileSettingsComponent } from './private/components/profile/profile-settings/profile-settings.component';
import { ResetEmailComponent } from './private/components/profile/reset-email/reset-email.component';
import { DelateAccountComponent } from './private/components/profile/delateAccount/delate-account/delate-account.component';
import { ValuationPageComponent } from './private/presentation-layer/valuation-page/valuation-page.component';
import { CalculateValueComponent } from './private/components/calculate-value/calculate-value.component';
import { DisplayValuationComponent } from './private/presentation-layer/display-valuation/display-valuation.component';
import { StockGraphComponent } from './private/presentation-layer/stock-graph/stock-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './Shared/pipes/search.pipe';
import { DatePipe } from '@angular/common';
import { SearchSmartComponent } from './private/components/search-smart-component/search-smart.component';
import { SearchUIComponent } from './private/presentation-layer/search-ui/search-ui.component';
import { CustomErrorHandlerService } from './core/errors/custom-error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastComponent } from './Shared/components/toast/toast.component';
import { SpinnerComponent } from './Shared/components/spinner/spinner.component';
import { DashbordComponent } from './private/components/dashbord/dashbord.component';
import { NavBarComponent } from './private/presentation-layer/nav-bar/nav-bar.component';







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
    NavBarComponent

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
