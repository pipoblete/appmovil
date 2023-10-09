import { Component, Renderer2, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Importa Ionic Storage

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loggedInUser: string = '';
  name: string = '';
  lastname: string = '';
  educationLevel: string = '';
  fecha: string = '';
  isAnimated: boolean = false;
  segmentValue: string = 'default';

  empresa: string = '';
  anioInicio: string = '';
  trabajaActualmente: boolean = false;
  anioTermino: string = '';
  cargo: string = '';

  nombreCertificado: string = '';
  fechaObtencion: string = '';
  certificadoVence: boolean = false;
  fechaVencimiento: string = '';

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private renderer: Renderer2,
    private el: ElementRef,
    private storage: Storage // Inyecta Ionic Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Crea el almacenamiento
    this.loggedInUser = await this.userService.getLoggedInUser();
  }

  async limpiarCampos() {
    this.name = '';
    this.lastname = '';
    this.educationLevel = '';
    this.isAnimated = true;
    this.empresa = '';
    this.anioInicio = '';
    this.trabajaActualmente = false;
    this.anioTermino = '';
    this.cargo = '';
    this.nombreCertificado = '';
    this.fechaObtencion = '';
    this.certificadoVence = false;
    this.fechaVencimiento = '';

    await this.storage.clear(); // Limpia todos los datos almacenados en Ionic Storage

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
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  async mostrarDatosLaborales() {
    const experienciaLaboral = `
      Empresa: ${this.empresa}
      Año de Inicio: ${this.anioInicio}
      Actualmente trabaja aquí: ${this.trabajaActualmente ? 'Sí' : 'No'}
      Año de Término: ${this.trabajaActualmente ? 'N/A' : this.anioTermino}
      Cargo: ${this.cargo}
    `;

    const alert2 = await this.alertController.create({
      header: 'Experiencia Laboral',
      message: experienciaLaboral,
      buttons: ['Cerrar'],
    });

    await alert2.present();
  }

  async mostrarDatosCertificados() {
    const certificados = `
      Nombre del Certificado: ${this.nombreCertificado}
      Fecha de Obtención: ${this.fechaObtencion}
      Certificado Vence: ${this.certificadoVence ? 'Sí' : 'No'}
      Fecha de Vencimiento: ${this.certificadoVence ? this.fechaVencimiento : 'N/A'}
    `;

    const alert3 = await this.alertController.create({
      header: 'Certificados',
      message: certificados,
      buttons: ['Cerrar'],
    });

    await alert3.present();
  }
}
