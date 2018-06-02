import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { FruitsComponent } from './fruits/fruits.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';

export const appRoutes : Routes = [
    {path : '' , component : HomeComponent},
    {path:'products', component:VegetablesComponent}, 
    {path : 'home' , component : HomeComponent},
    {path : 'fruits' , component : FruitsComponent},
    {path : 'cart' , component : CartComponent},
  
];