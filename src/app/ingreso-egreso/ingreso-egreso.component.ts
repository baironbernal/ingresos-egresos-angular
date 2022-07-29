import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IncomeEgress } from '../models/income-egress.model';
import { IncomeEgressService } from '../services/income-egress.service';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  incomeForm: FormGroup;
  type: string = 'income';
  loading: boolean = false; 
  uiSuscription: Subscription;

  constructor(private fb: FormBuilder, private ieService: IncomeEgressService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)

  }
  
  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
  }

  save() {

    if(this.incomeForm.invalid) {return;}

    this.store.dispatch(isLoading())

    const { description, amount }  = this.incomeForm.value;

    const incomeEgress = new IncomeEgress(description, amount, this.type)
    
    this.ieService.create(incomeEgress)
              .then( ()  => { 
                this.store.dispatch(stopLoading())
                  Swal.fire('Registro creado', description, 'success')
               })
              .catch( err => Swal.fire('Error', err.message, 'error') )
  }

}
