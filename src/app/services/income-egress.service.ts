import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeEgress } from '../models/income-egress.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  create(incomeEgress: IncomeEgress) {
    return this.firestore.doc(this.authService.user.uid + '/ingresos-egresos')
                  .collection('items')
                  .add( {...incomeEgress} )
  }

  initialIncomeEgressListener(uid: string) {
      return this.firestore.collection(uid + '/ingresos-egresos/items')
                .snapshotChanges()
                .pipe(
                  map( snapshot => {
                    return snapshot.map(doc => {
                      return {
                        uid: doc.payload.doc.id,
                        data: doc.payload.doc.data()
                      }
                    });
                  })
                );
  }

  deleteIncomeEgress(uidItem: string) {
    const url = this.authService.user.uid + '/ingresos-egresos/items/'+ uidItem;
    return this.firestore.doc(url).delete()
  }

  
}
