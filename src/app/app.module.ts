import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MediaMatcher} from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule, MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatNativeDateModule, MatDatepickerModule,
  MatGridListModule, MatAutocompleteModule, MatDividerModule, MatDialogModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DialogModule} from 'primeng/dialog';
import {DataTableModule} from 'primeng/datatable';
import {SlideMenuModule} from 'primeng/slidemenu';
import {CarouselModule} from 'primeng/carousel';
import {DropdownModule} from 'primeng/primeng';
import {FullCalendarModule} from 'primeng/fullcalendar';
import 'moment';
// import 'fullcalendar';
import 'jquery';

/*Components*/
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

/*Services*/
import { APP_CONFIG, AppConfig} from './app.config';
// import {MyHttpLogInterceptor} from './http.interceptor';
import {EmployeeService} from './service/employee.service';
import {AuthenticationService} from './service/authentication.service';
import {ChartsModule} from 'ng2-charts';
import {ParticlesModule} from 'angular-particle';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    DashboardComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ParticlesModule,
    MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatGridListModule,
    MatTableModule, MatSidenavModule, MatToolbarModule, MatDatepickerModule, MatCardModule,
    MatMenuModule, MatSelectModule, MatAutocompleteModule,  MatDividerModule, MatDialogModule,
    MatPaginatorModule, MatNativeDateModule, MatListModule,
    ChartsModule,
    DialogModule,
    SlideMenuModule,
    CarouselModule,
    DataTableModule,
    DropdownModule,
    FullCalendarModule
  ],
  providers: [MediaMatcher, {provide: APP_CONFIG, useValue: AppConfig},
    // { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true },
    AuthenticationService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
