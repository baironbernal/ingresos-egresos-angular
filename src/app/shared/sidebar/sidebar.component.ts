import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut()
        .then(() => this.router.navigate(['/login']))
        .catch(err => err)
  }

}
