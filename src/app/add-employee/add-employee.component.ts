import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [TitleCasePipe]
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  set mobileQueryListener(value: () => void) {
    this._mobileQueryListener = value;
  }
  employeeForm: FormGroup;
  states: any[];
  employees: any[];
  districts: any[];
  taluks: any[];
  isDistrict = false;
  isTaluk = false;
  constructor(fb: FormBuilder,
              private router: Router,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private employeeService: EmployeeService,
              private ts: TitleCasePipe) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.employeeForm = fb.group({
      color: ['#4CAF50'],
      name: [''],
      mobileNo: [''],
      birthDate: [''],
      idProof: [''],
      address: [''],
      taluk: [''],
      district: [''],
      state: [''],
      landmark: [''],
      pincode: [''],
      department: [''],
      designation: [''],
      branch: [''],
      joinedDate: ['']
    });
    this.isDistrict = true;
    this.isTaluk = true;
  }
  ngOnInit() {
    this.states = ['Tamilnadu', 'Kerala', 'Karnataka'];

  }
  mobileQuery: MediaQueryList;

  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  resetForm() {
    this.employeeForm.reset();
    this.isDistrict = true;
    this.districts = [];
    this.isTaluk = true;
    this.taluks = [];
  }
  logout() {
    this.router.navigate(['/']);
  }
  onSelectionChanged(event) {
    if (event.option.value === 'Tamilnadu') {
      this.isDistrict = false;
      this.districts = ['Salem', 'Namakkal', 'Erode', 'Dharmapuri', 'Krishnagiri'];
    }
  }
  selectDistrict(event) {
    if (event.option.value === 'Salem') {
      this.isTaluk = false;
      this.taluks = ['Omalur', 'Attur', 'Metur', 'Edapadi', 'Vazhapadi'];
    }
  }
  addEmployee(model: FormGroup) {
    const employeename = this.ts.transform(this.employeeForm.controls.name.value);
    console.log(employeename);
    this.employeeService.addEmployees(model.value).subscribe(data => {
      this.employees = data;
      console.log(this.employees);
    });
  }
}

