import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser: string = ''; 

  
  setLoggedInUser(username: string) {
    this.loggedInUser = username;
  }


  getLoggedInUser(): string {
    return this.loggedInUser;
  }
}