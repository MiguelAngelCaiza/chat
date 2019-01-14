import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('Todos los Campos son Requeridos');
      toaster.present();
    }else if (this.newuser.email == undefined || this.newuser.password == undefined || this.newuser.displayName == undefined) {
      toaster.setMessage('Todos los Campos son Requeridos');
      toaster.present();
    }else if(this.validateEmail(this.newuser.email) == false){
      toaster.setMessage('Ingresar Correo Electrónico Válido.');
      toaster.present();
    }
    else if (this.verifyPassword(this.newuser.password) == false) {
      toaster.setMessage('La contraseña no cumple con la seguridad necesaria');
      toaster.present();
    }
    else {

      let loader = this.loadingCtrl.create({
        content: 'Espera'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push('ProfilepicPage');
        else
          alert('Error' + res);
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

  verifyPassword(password) {
    var re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{8,}/ ;
    return re.test(password);
  }


}
