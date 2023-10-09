import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUserKey: string = 'loggedInUser'; // Clave para el usuario conectado en Ionic Storage

  constructor(private storage: Storage) {}

  async setLoggedInUser(username: string) {
    await this.storage.set(this.loggedInUserKey, username);
  }

  async getLoggedInUser(): Promise<string> {
    return await this.storage.get(this.loggedInUserKey) || ''; // Si no se encuentra, devuelve una cadena vacía
  }
}
