import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeEgress } from 'src/app/models/income-egress.model';
import { Subscription } from 'rxjs';
import { IncomeEgressService } from '../../services/income-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  infoTable: IncomeEgress[] = [];
  incomeSubs: Subscription;


  constructor(private store: Store<AppState>,
              private ic: IncomeEgressService
    ) { }

  ngOnInit(): void {
      this.incomeSubs = this.store.select('incomeEgress')
      .subscribe((items) => this.infoTable = items.items)
  }

  ngOnDestroy(): void {
    this.incomeSubs.unsubscribe()
  }


  delete(uid: string) { 
     this.ic.deleteIncomeEgress(uid)
         .then(() => Swal.fire('Hey user!', 'I dont', 'warning'))
         .catch(err => Swal.fire('err', err.message, 'error'))
  }


}
