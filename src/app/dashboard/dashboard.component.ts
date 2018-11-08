import {Component, ChangeDetectorRef, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  items: any[];
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.items = [
      {data: 'Salem - 45'},
      {data: 'Chennai - 96'},
      {data: 'Dharmapuri - 32'},
      {data: 'Namakkal - 18'}
    ];
  }
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', fill: false},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', fill: false},
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType: string = 'line';
  public barChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', fill: false},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', fill: false},
  ];
  public barChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartOptions: any = {
    responsive: true,
  };
  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public barChartLegend:boolean = false;
  public barChartType:string = 'bar';
  goBack(){
    this.router.navigate(['./login'])
  }
  mobileQuery: MediaQueryList;


  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout() {
    this.router.navigate(['/'])

  }

}
