import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore,
              public auth: AngularFireAuth) { }
  
  initAuthListener() {
    this.auth.authState.subscribe( fireUser => {
        console.log(fireUser)
    })
  }

  createUser(nombre: string, email:string, password: string) {
      return this.auth.createUserWithEmailAndPassword(email,password)
              .then(({ user }) => {
                const newUser = new User(user.uid, nombre, user.email);
                this.firestore.doc(user.uid + '/usuario').set({...newUser})
              })
              .catch(err => err)
  }

  loginUser(email:string, password: string) {
      return this.auth.signInWithEmailAndPassword(email,password)
  }

  logOut() {
    return this.auth.signOut()    
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
