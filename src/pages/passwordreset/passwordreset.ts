import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice: UserProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PasswordresetPage');
  }

  reset() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if(this.validateEmail(this.email) == false){
      toaster.setMessage('Ingresar Correo Electrónico Válido.');
      toaster.present();
    }else{
      this.userservice.passwordreset(this.email).then((res: any) => {
        if (res.success) {
          toaster.setMessage('Correo Electrónico Enviado, Lea las instrucciones del mesaje enviado a su correo electrónico para reestablecer la contraseña');
          toaster.present();
        }
      }).catch((err) => {
        alert(err);
      });
    }

  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

  validateEmail(email){
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
  }


}
