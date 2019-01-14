import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('ACTUALIZADO');
          statusalert.setSubTitle('¡Tu foto de perfil ha sido cambiada exitosamente!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = url;
        })
        }
      }).catch((err) => {
          statusalert.setTitle('ERROR');
          statusalert.setSubTitle('Tu foto de perfil no ha cambiado');
          statusalert.present();
      })
      })
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['Aceptar']
    });
    let alert = this.alertCtrl.create({
      title: 'Editar Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Editar',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('ACTUALIZADO');
                statusalert.setSubTitle('¡Tu Nickname ha sido cambiado con éxito!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              }

              else {
                statusalert.setTitle('ERROR');
                statusalert.setSubTitle('Tu Nickname no fue cambiado');
                statusalert.present();
              }

            })
          }
        }

      }]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }


}
