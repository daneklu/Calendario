
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  constructor(private firestore: Firestore, private auth: Auth) { }

  loginWithEmail(data: { email: string, password: string }) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password);
  }

  signup(data: { email: string, password: string }) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password);
  }

  saveDetails(data: any) {
    const userRef = doc(this.firestore, 'users', data.uid);
    return setDoc(userRef, data);
  }

  getDetails(data: { uid: string }) {
    const userRef = doc(this.firestore, 'users', data.uid);
    return getDoc(userRef);
  }
}