import { Routes } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { CarComponent } from './car/car.component';
import { PersonComponent } from './person/person.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'persons', component: PersonComponent},
    {path: 'drivers', component: DriverComponent},
    {path: 'cars', component: CarComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];