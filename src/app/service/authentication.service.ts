import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private eventUrl = 'http://localhost:4900/events';
  private userUrl = 'http://localhost:4900/sobjects/user';
  private query = 'query?q=select id,Subject,StartDateTime,EndDateTime,Location,CreatedById from Event';
  url = 'https://calendar5-dev-ed.my.salesforce.com'  ;
  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  login(loginForm) {
    return this.http.post(`${this.config.apiEndpoint}`, JSON.stringify({email: 'priyadharshini.m@vee2it.com', user_password: 'Priya@123'}));
  }
  public getEvent(): Observable<any> {
    return this.http.get(`${this.eventUrl}`,
      { responseType: 'text' }).map(res => {
      return JSON.parse(res);
    });
  }
  public getUserbyId(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}`,
      { responseType: 'text' }).map(res => {
      return JSON.parse(res);
    });
  }
  addEvent(addEventForm): Observable<any> {
    const requestData = {
      Subject: addEventForm.title,
      StartDateTime: addEventForm.startDate,
      EndDateTime: addEventForm.endDate,
      Location: addEventForm.location
    };
    return this.http.post('https://ap5.salesforce.com/services/data/v37.0/sobjects/Event/', requestData).map(res => {
      return res;
    });
  }
}




