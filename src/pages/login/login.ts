import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public authservice: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if(this.validateEmail(this.credentials.email) == false){
      toaster.setMessage('Ingresar Correo Electrónico.');
      toaster.present();
    }else if(this.credentials.password == '' || this.credentials.password == undefined){
      toaster.setMessage('Ingresar Contraseña');
      toaster.present();
    }else{
      this.authservice.login(this.credentials).then((res: any) => {
        if (!res.code){
          this.navCtrl.setRoot('TabsPage');
        }else{

          if(res.code == 'auth/user-not-found'){
            toaster.setMessage('El Correo Electrónico que ingreso no se encuentra registrado.');
            toaster.present();
          }else if(res.code == 'auth/wrong-password'){
            toaster.setMessage('La contraseña que ingreso no es correcta.');
            toaster.present();
          }else{
            alert(res);
          }

        }
      });
    }
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

  validateEmail(email){
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
  }

}
