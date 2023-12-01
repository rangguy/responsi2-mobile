import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
const USERNAME = 'namasaya';
const ID = 'idsaya';
@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.page.html',
  styleUrls: ['./siswa.page.scss'],
})
export class SiswaPage implements OnInit {
  public nama = '';
  public ID = '';
  dataNilai: any = [];
  id: any;
  mata_pelajaran: any;
  nilai: any;
  id_siswa: any;

  constructor(
    public _apiService: ApiService,
    private modal: ModalController,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cekSesi();
    this.ambilNilai(this.ID);
    console.log(this.ID);
    console.log(this.nama);
  }

  async cekSesi() {
    const ambilNama = localStorage.getItem(USERNAME);
    const ambilId = localStorage.getItem(ID);
    if (ambilNama && ambilId) {
      let namauser = ambilNama;
      let idUser = ambilId;
      this.nama = namauser;
      this.ID = idUser;
    }else {
      console.log("Data kosong")
    }
  }

  ambilNilai(ID: any) {
    this._apiService.lihat(ID, 'lihat.php?id_siswa=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        this.dataNilai = hasil;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }
}
