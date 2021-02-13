import { ApiauthService } from './services/apiauth.service';
import { Component } from '@angular/core';
import { Usuario } from './models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario!: Usuario;

  constructor(
    public apiAuthService: ApiauthService,
    private router: Router)
  {
    this.apiAuthService.user.subscribe( res => {
      this.usuario = res;
      console.log('the object has changes: ' + res);
    });
  }

  logout(): void {
    this.apiAuthService.logout();
    this.router.navigate(['/login']);
  }
}
