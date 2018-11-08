import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menus',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'fa fa-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Employee',
        icon: 'fa fa-user',
        items: [
          {label: 'Add Employee', icon: 'fa-plus', routerLink: 'newEmployee'},
          {label: 'View Employee', icon: 'fa-eye', routerLink: 'employee_list'}
        ]
      },
      {
        label: 'Department',
        icon: 'fa fa-building-o',
        items: [
          {label: 'Add Department', icon: 'fa-plus', routerLink: 'newEmployee'},
          {label: 'View Department', icon: 'fa-mail-reply', routerLink: 'employee_list'}
        ]
      },
      {
        label: 'Designation',
        icon: 'fa fa-edit',
        items: [
          {label: 'Add Designation', icon: 'fa-mail-forward', routerLink: 'addEmployee'},
          {label: 'View Designation', icon: 'fa-mail-reply', routerLink: 'employee_list'}
        ]
      },
      {
        label: 'Schedule',
        icon: 'fa fa-sitemap',
        routerLink: 'scheduler'
      }
    ];
  }

}
