import {Component, OnInit} from '@angular/core';
import {User} from '../../users/user';
import swal from 'sweetalert2';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title = 'Sign in';
  user: User;
  errors: string[];

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.authService.login(this.user).subscribe(response => {
        this.authService.guardUser(response.access_token);
        this.authService.guardToken(response.access_token);
        this.router.navigate(['/dashboard']);
      }, err => {
        if (err.status === 400) {
          swal.fire('Login error', `${err.status}`, 'error');
        }
      }
    );
  }

}
