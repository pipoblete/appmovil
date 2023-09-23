import { Component, Renderer2, ElementRef} from '@angular/core';
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
    isAnimated: boolean = false;


    constructor(private userService: UserService, private alertController: AlertController, private renderer:  Renderer2, private el: ElementRef) {}

    ;
  


    ngOnInit() {
      this.loggedInUser = this.userService.getLoggedInUser();
    }
  
    limpiarCampos() {
      this.name = '';
      this.lastname = '';
      this.educationLevel = '';
      this.isAnimated = true;

      setTimeout(() => {
        this.isAnimated = false;
      }, 1000);
    }

    async mostrarDatos() {
      const mensaje = `Nombre: ${this.name}  ${this.lastname}
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
