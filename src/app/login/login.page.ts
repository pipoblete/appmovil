import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild(IonModal) modal!: IonModal;

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router, private alertController: AlertController, private userService: UserService) {}

  registro() {
    this.router.navigate(['/register']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async login() {
    if (this.username === 'milo' && this.password === '1234') {
      this.router.navigate(['/home']); 
      this.modal.dismiss(this.username, 'confirm');
      const loggedInUsername = this.username;
      this.userService.setLoggedInUser(loggedInUsername);
    } else {
      this.modal.dismiss(null, 'cancel');
      await this.presentAlert('Credenciales incorrectas');
      
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de autenticación',
      message: 'Ingrese nuevamente sus datos',
      buttons: ['OK']
    });

    await alert.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


}
