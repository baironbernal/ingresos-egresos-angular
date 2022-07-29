import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { unSetItems } from 'src/app/ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService,
              private store: Store
              ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut()
        .then(() => this.router.navigate(['/login']))
        .catch(err => err)
    
    this.store.dispatch(unSetItems())
    
  }

}
