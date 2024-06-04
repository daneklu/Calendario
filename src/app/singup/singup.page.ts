import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  public email: any;
  public password: any;
  public name: any;

  constructor(public fireService: FireserviceService, private router: Router) {}

  ngOnInit() {}

  signup() {
    this.fireService.signup({ email: this.email, password: this.password }).then(
      (res) => {
        if (res.user) {
          let data = {
            email: this.email,
            password: this.password,
            name: this.name,
            uid: res.user.uid,
          };
          this.fireService.saveDetails(data).then(
            (res) => {
              alert('Account Created');
              this.router.navigate(['/home']);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        alert(err.message);
        console.log(err);
      }
    );
  }
}