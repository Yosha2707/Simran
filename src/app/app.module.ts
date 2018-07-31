import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoadingModule } from 'ngx-loading';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { FruitsComponent } from './fruits/fruits.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { OrdersComponent } from './orders/orders.component';
import { TcComponent } from './tc/tc.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { NumberOnlyDirective } from './directive/numbers.directive';
import { HighlightDirective } from './directive/highlight.directive';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { NotfoundcomponentComponent } from './notfoundcomponent/notfoundcomponent.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DisclamierComponent } from './disclamier/disclamier.component';
import { CoustomercareComponent } from './coustomercare/coustomercare.component';
import { ProcessComponent } from './process/process.component';
import { CombobasketComponent } from './combobasket/combobasket.component';
import { ProductsComponent } from './products/products.component';
import { CcAvenComponent } from './cc-aven/cc-aven.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap';
import { PaymentRedirectComponent } from './payment-redirect/payment-redirect.component';
import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { CancelUrlComponent } from './cancel-url/cancel-url.component';
import { SuccessComponent } from './success/success.component';
import { OrderinfoComponent } from './orderinfo/orderinfo.component';
import { CombosComponent } from './combos/combos.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { SelectModule } from 'ng-select';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
//import { MyDropdownFieldComponent } from './controls/my-dropdown-field.component';
import { DawaAutocompleteModule } from 'ngx-dawa-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    //MyDropdownFieldComponent,
    HomeComponent,
    HeaderComponent,
    VegetablesComponent,
    FruitsComponent,
    FooterComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    MyaccountComponent,
    OrdersComponent,
    TcComponent,
    PrivacyComponent,
    ContactComponent,
    CheckoutComponent,
    HighlightDirective,
    WhishlistComponent,
    ChangepasswordComponent,
    UpdateprofileComponent,
    NotfoundcomponentComponent,
    AboutusComponent,
    DisclamierComponent,
    CoustomercareComponent,
    ProcessComponent,
    CombobasketComponent,
    ProductsComponent,
    CcAvenComponent,
    PaymentRedirectComponent,
    RedirectUrlComponent,
    CancelUrlComponent,
    NumberOnlyDirective,
    SuccessComponent,
    OrderinfoComponent,
    CombosComponent
  ],
  imports: [
    BrowserModule,
    SelectModule,
    NgSlimScrollModule,
    TooltipModule.forRoot(),
    DawaAutocompleteModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    CollapseModule.forRoot(),
    LoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff',
      fullScreenBackdrop:true
  }),
    NgBootstrapFormValidationModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
   // MatTabsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    BsDatepickerModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [DataService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}, {
    provide: SLIMSCROLL_DEFAULTS,
    useValue: {
      alwaysVisible : false
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
