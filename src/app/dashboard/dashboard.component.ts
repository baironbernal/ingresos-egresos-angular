import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IncomeEgressService } from '../services/income-egress.service';
import { Subscription } from 'rxjs';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  infoSubs: Subscription;

  constructor(private store: Store<AppState>, private incomeEgressService: IncomeEgressService) { }

  ngOnInit(): void {
      
    this.userSubs =  this.store.select('auth')
        .pipe(filter(auth => auth.user != null))  
        .subscribe( 
            ({user })=> {
              this.infoSubs = this.incomeEgressService.initialIncomeEgressListener(user.uid)
                .subscribe( info => {
                  
                  this.store.dispatch(setItems({ items: info }))
                })          
            }
        )

  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.infoSubs.unsubscribe();

  }

}
