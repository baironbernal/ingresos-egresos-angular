import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  uiSuscription: Subscription; 
  userSuscription: Subscription; 

  profileForm: FormGroup;
  profile: any;
  loading: boolean = false;

  constructor(private store: Store<AppState>, private fb: FormBuilder) 
  { }

  ngOnInit(): void {

    this.uiSuscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading)

    this.userSuscription = this.store.select('auth')
              .pipe(filter(auth => auth.user != null))
              .subscribe(({ user }) => this.profile = user)
    
    console.log(this.profile)

    this.profileForm = this.fb.group({
      nombre: [this.profile?.nombre, [Validators.required]],
      password: ['123456', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
    this.userSuscription.unsubscribe()
  }

  save() {
    
  }

}
