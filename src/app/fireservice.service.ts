import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  loginWithEmail(data: { email: string, password: string }) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data: { email: string, password: string }) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).set(data);
  }

  getDetails(data: { uid: string }) {
    return this.firestore.collection('users').doc(data.uid).get();
  }
}