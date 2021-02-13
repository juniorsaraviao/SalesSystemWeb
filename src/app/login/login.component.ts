import { ApiauthService } from './../services/apiauth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public email!: string;
  // public password!: string;

  constructor(
    private authService: ApiauthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  )
  {
    if (this.authService.usuarioData){
      this.router.navigate(['/']);
    }
  }

  // First Implementation for Forms
  // public loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // });

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (parseInt( res.success.toString(), 10 ) === 1) {
        this.snackBar.open(res.message, '', {
          duration: 2000
        });
        this.router.navigate(['/']);
      }else{
        this.snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    });
  }

}
