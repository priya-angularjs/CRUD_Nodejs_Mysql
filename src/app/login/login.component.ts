import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService} from '../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const nameRegex = '/^[a-zA-Z ]+$/';
    this.loginForm = this.fb.group({
      name: [''],
      password: ['']
    });
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 500,
        },
        color: {
          value: '#298495'
        },
        shape: {
          type: 'circle',
        },
      }
    };
  }
  login(loginForm) {
    if (this.loginForm.controls.name.value === 'test' && this.loginForm.controls.password.value === 'test') {
      this.router.navigate(['home/dashboard']);
    } else {
      console.log(this.loginForm.controls.name.value);
      console.log('Login Failed');
    }
    this.authenticationService.login(loginForm.value).subscribe(Response => {});
  }

}
