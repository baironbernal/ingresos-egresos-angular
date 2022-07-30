import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { StaticInterface } from './statictics.interface';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
})

export class EstadisticaComponent implements OnInit, OnDestroy {

  staticSubs: Subscription;
  
  init: StaticInterface = {
    total: 0,
    amount: 0
  }

  incomeStatictics: StaticInterface;
  egressStatictics: StaticInterface;

  constructor(private store: Store<AppState>) {
    this.incomeStatictics = {...this.init};
    this.egressStatictics = {...this.init};
  }

  ngOnInit(): void {
    
    this.staticSubs = this.store.select('incomeEgress')
          .subscribe(incomeEgressF => this.generateStatics(incomeEgressF))
    
  }
  
  generateStatics({ items }) {
    items.map(({data}) => {
      if(data.type === 'income') {
        this.incomeStatictics.amount ++;
        this.incomeStatictics.total += data.amount;
      }
      else {
        this.egressStatictics.total += data.amount;
        this.egressStatictics.amount ++;
      }
    })
  }

  ngOnDestroy(): void {
    this.staticSubs.unsubscribe()
  }
}
