import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {parseIntAutoRadix} from '@angular/common/src/i18n/format_number';
@Injectable()
export class EmployeeService {
  employeeUrl = `${this.config.apiEndpoint}/employees`;
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {
  }
  public addEmployees(employeeForm): Observable<any> {
    const options = {
      name: employeeForm.name,
      mobile_no: employeeForm.mobileNo,
      dob: moment(employeeForm.birthDate).format('YYYY-MM-DD'),
      id_proof: employeeForm.idProof,
      address: employeeForm.address,
      landmark: employeeForm.landmark,
      state: employeeForm.district,
      district: employeeForm.state,
      taluk: employeeForm.taluk,
      pincode: employeeForm.pincode,
      department: +(employeeForm.department),
      designation: +(employeeForm.designation),
      branch: employeeForm.branch,
      joined_date: moment(employeeForm.joinedDate).format('YYYY-MM-DD'),
    };
    return this.http.post(`${this.employeeUrl}`, options).map((res: Response) => res);
  }
  public getEmployees(): Observable<any> {
    return this.http.get(this.employeeUrl).map((res: Response) => {
      return res;
    });
  }
  public getEmployeebyId(id): Observable<any> {
    return this.http.get(`${this.employeeUrl}/${id}`).map((res: Response) => {
      return res;
    });
  }
  public deleteEmployees(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'responseType':  'text',
      })
    };
    return this.http.delete(`${this.employeeUrl}/${id}`).map(res => {
      return res;
    });
  }
  public updateEmployees(employeeListForm): Observable<any> {


    const options = {
      id: employeeListForm.id,
      name: employeeListForm.name,
      mobile_no: employeeListForm.mobileNo,
      dob: moment(employeeListForm.birthDate).format('YYYY-MM-DD'),
      id_proof: employeeListForm.idProof,
      address: employeeListForm.address,
      landmark: employeeListForm.taluk,
      state: employeeListForm.district,
      district: employeeListForm.state,
      taluk: employeeListForm.landmark,
      pincode: employeeListForm.pincode,
      department: +(employeeListForm.department),
      designation: +(employeeListForm.designation),
      branch: employeeListForm.branch,
      joined_date: moment(employeeListForm.joinedDate).format('YYYY-MM-DD'),
    };
    return this.http.put(`${this.employeeUrl}/${employeeListForm.id}`, options).map(res => {
      return res;
    });
  }
}
