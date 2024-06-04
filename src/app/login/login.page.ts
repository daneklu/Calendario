import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public fireService: FireserviceService
  ) { }

  ngOnInit() {
  }

  login() {
    this.fireService.loginWithEmail({ email: this.email, password: this.password }).then((res: any) => {
      console.log(res);
      if (res.user.uid) {
        this.fireService.getDetails({ uid: res.user.uid }).then(
          (doc: any) => {
            if (doc.exists()) {
              const userData = doc.data();
              console.log(userData);
              alert('Welcome ' + userData['name']);
              // Redirect to the home page
              this.router.navigate(['/home']);
            } else {
              console.log('No such document!');
            }
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    }, (err: any) => {
      alert(err.message);
      console.log(err);
    });
  }

  signup() {
    this.router.navigateByUrl('signup');
  }
}