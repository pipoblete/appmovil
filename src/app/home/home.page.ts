import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    loggedInUser: string = '';
    name: string = '';
    lastname: string = '';
    educationLevel: string = '';
    fecha: string = '';
  
    constructor(private userService: UserService, private alertController: AlertController) {}

    ;
  


    ngOnInit() {
      this.loggedInUser = this.userService.getLoggedInUser();
    }
  
    limpiarCampos() {
      this.name = '';
      this.lastname = '';
      this.educationLevel = '';
      
    }

    async mostrarDatos() {
      const mensaje = `Nombre: ${this.name}
      || Apellido: ${this.lastname}
      || Nivel de educación: ${this.educationLevel}
      || Fecha: ${this.fecha}`;	

      const alert = await this.alertController.create({
        header: 'Datos Ingresados',
        message: mensaje,
        buttons: ['Cerrar']
      });
  
      await alert.present();
    }
}
