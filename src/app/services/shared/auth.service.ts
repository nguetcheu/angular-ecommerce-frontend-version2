import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.isAuthenticated = true;
        localStorage.setItem('token', 'true');
        alert('Connexion succesful');
        this.router.navigate(['/products']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.isAuthenticated = true;
        alert('Inscription succesful');
        this.router.navigate(['/products']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        this.router.navigate(['/products']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  // Check if user is authenticated
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}