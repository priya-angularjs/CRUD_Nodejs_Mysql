import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {MenuComponent} from './menu/menu.component';
import {SchedulerComponent} from './scheduler/scheduler.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'menus', component: MenuComponent},
  {path: 'home', component: HomeComponent,
  children: [{path: 'dashboard', component: DashboardComponent},
    {path: 'newEmployee', component: AddEmployeeComponent},
    {path: 'employee_list', component: EmployeeListComponent},
    {path: 'scheduler', component: SchedulerComponent}]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
