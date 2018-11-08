import {Inject, Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor } from '@angular/forms';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {MatPaginator, MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {EmployeeService} from '../service/employee.service';
import {Employee} from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employeeListForm: FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  display: boolean;
  loading: boolean;
  employeeList: Employee[];
  employee: Employee = new PrimeEmployee();
  selectedEmployee: Employee;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 100;
  pageSize = 10;
  constructor(private fb: FormBuilder,
              private router: Router,
              changeDetectorRef: ChangeDetectorRef,
              private employeeService: EmployeeService,
              private dialog: MatDialog,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.employeeListForm = this.fb.group({
      id: [''],
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
    this.getEmployee();

    // this.dashboards =['Employees','Branches','Departments','Designations'];
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onRowSelect(event) {
    this.display = true;
    this.employee = this.cloneEmployee(event.data);
    const res = event.data;
    // this.employeeService.getEmployeebyId(row.id).subscribe(res => {
    this.employeeListForm.controls['id'].patchValue(res.id);
    this.employeeListForm.controls['name'].patchValue(res.name);
    this.employeeListForm.controls['mobileNo'].patchValue(res.mobile_no);
    this.employeeListForm.controls['birthDate'].patchValue(res.dob);
    this.employeeListForm.controls['idProof'].patchValue(res.id_proof);
    this.employeeListForm.controls['address'].patchValue(res.address);
    this.employeeListForm.controls['taluk'].patchValue(res.taluk);
    this.employeeListForm.controls['district'].patchValue(res.district);
    this.employeeListForm.controls['state'].patchValue(res.state);
    this.employeeListForm.controls['landmark'].patchValue(res.landmark);
    this.employeeListForm.controls['pincode'].patchValue(res.pincode);
    this.employeeListForm.controls['department'].patchValue(res.department);
    this.employeeListForm.controls['designation'].patchValue(res.designation);
    this.employeeListForm.controls['branch'].patchValue(res.branch);
    this.employeeListForm.controls['joinedDate'].patchValue(res.joined_date);
    // });

    // this.openAddFileDialog(row.id);
  }
  deleteEmployee() {
    this.employeeService.deleteEmployees(this.employeeListForm.controls['id'].value).subscribe(res => {
      this.close();
    });
  }
  updateEmployee(model: FormGroup) {
    this.employeeService.updateEmployees(model.value).subscribe(res => {
      this.close();
    });
  }
  getEmployee() {
    this.employeeService.getEmployees().subscribe( (employeeList) => {

      // this.dataSource = new MatTableDataSource<Element>(employeeList);
      this.employeeList = employeeList;
      // this.dataSource.paginator = this.paginator;
      console.log(this.employeeList);

    });
  }
  cloneEmployee(e: Employee): Employee {
    const employee = new PrimeEmployee();
    for (const prop in e) {
      employee[prop] = e[prop];
    }
    return employee;
  }
  close(): void {
    this.display = false;
    this.getEmployee();
  }
  public getServerData(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.length = event.length;
    return event;
  }
}
class PrimeEmployee implements Employee {
  constructor(public id?, public name?, public mobile_no?, public dob?, public id_proof?, public address?,
              public taluk?, public district?, public state?, public landmark?, public pincode?, public department?,
              public designation?, public branch?, public joined_date?) {}
}

