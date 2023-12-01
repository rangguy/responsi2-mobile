import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
const USERNAME = 'namasaya';
// const ROLE = 'rolesaya';
const ID = 'idsaya';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public nama = '';
  // public role = '';
  public ID = '';
  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) {}
  ngOnInit() {
    this.cekSesi();
    console.log(this.nama);
    // console.log(this.role);
    console.log(this.ID);
  }
  async cekSesi() {
    const ambilNama = localStorage.getItem(USERNAME);
    // const ambilRole = localStorage.getItem(ROLE);
    const ambilId = localStorage.getItem(ID);
    if (ambilNama && ambilId ) {
      // let roleuser = ambilRole;
      let namauser = ambilNama;
      let idUser = ambilId;
      this.nama = namauser;
      // this.role = roleuser;
      this.ID = idUser;
    } else {
      this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }
  logout() {
    this.alertController
      .create({
        header: 'Perhatian',
        subHeader: 'Yakin Logout aplikasi ?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Yakin',
            handler: (data: any) => {
              //jika tekan yakin
              this.authService.logout();
              this.router.navigateByUrl('/', { replaceUrl: true });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
