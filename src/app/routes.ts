import {Routes} from '@angular/router'
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
import { PaymentRedirectComponent } from './payment-redirect/payment-redirect.component';
import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { CancelUrlComponent } from './cancel-url/cancel-url.component';
import { SuccessComponent } from './success/success.component';
import { OrderinfoComponent } from './orderinfo/orderinfo.component';
import { CombosComponent } from './combos/combos.component';

export const appRoutes : Routes = [
    {path : 'homeauth' , canActivate:[AuthGuard], component : HomeComponent},
    {path : '' , component : HomeComponent},
    {path : 'home' , component : HomeComponent},
    {path:'Vegetables', component:VegetablesComponent}, 
    {path : 'home' , component : HomeComponent},
    {path : 'Fruits' , component : FruitsComponent},
    {path : 'cart' , component : CartComponent},
    {path : 'login' , component : SigninComponent},
    {path : 'signup' , component : SignupComponent},
    {path : 'myaccount' , component : MyaccountComponent, canActivate:[AuthGuard]},
    {path : 'Orders' , component : OrdersComponent, canActivate:[AuthGuard]},
    {path : 'terms' , component : TcComponent},
    {path : 'disclaimer' , component : DisclamierComponent},
    {path : 'coustomercare' , component : CoustomercareComponent},
    {path : 'policy' , component : PrivacyComponent},
    {path : 'process' , component : ProcessComponent},
    {path : 'contact' , component : ContactComponent},
    {path : 'out' , component : CheckoutComponent , canActivate:[AuthGuard]},
    {path : 'wish' , component : WhishlistComponent, canActivate:[AuthGuard]},
    {path : 'changepassword' , component : ChangepasswordComponent , canActivate:[AuthGuard]},
    {path : 'updateprofile' , component : UpdateprofileComponent, canActivate:[AuthGuard]},
    {path : 'about' , component : AboutusComponent},
    {path : 'Combos' , component : CombosComponent},
    {path : 'Exotic' , component : CombobasketComponent},
    {path : 'Ready To Use' , component : CombobasketComponent},
    {path : 'Frozen' , component : CombobasketComponent},
    {path : 'products/:id' , component : ProductsComponent},
    {path : 'test' , component : CcAvenComponent},
    {path : 'redirectPay' , component : PaymentRedirectComponent},
    {path : 'success' , component : SuccessComponent},
    {path : 'redirect_url' , component : RedirectUrlComponent},
    {path : 'cancel_url' , component : CancelUrlComponent},
    {path : 'info/:id' , component : OrderinfoComponent},

    {path : '**' , component : NotfoundcomponentComponent},
    
  
];