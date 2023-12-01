import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nilai',
  templateUrl: './nilai.page.html',
  styleUrls: ['./nilai.page.scss'],
})
export class NilaiPage implements OnInit {
  dataNilai: any = [];
  modal_tambah = false;
  modal_edit = false;
  id: any;
  mata_pelajaran: any;
  nilai: any;
  id_siswa: any;

  constructor(public _apiService: ApiService, private modal: ModalController) {}

  ngOnInit() {
    this.getNilai();
  }

  getNilai() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataNilai = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.mata_pelajaran = '';
    this.nilai = '';
    this.id_siswa = '';
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilNilai(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  tambahNilai() {
    if (this.mata_pelajaran != '' && this.nilai != '' && this.id_siswa != '') {
      let data = {
        mata_pelajaran: this.mata_pelajaran,
        nilai: this.nilai,
        id_siswa: this.id_siswa,
      };
      this._apiService.tambah(data, 'tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah data nilai');
          this.getNilai();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah data nilai');
        },
      });
    } else {
      console.log('gagal tambah data nilai karena masih ada data yang kosong');
    }
  }

  hapusNilai(id: any) {
    this._apiService.hapus(id, 'hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getNilai();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilNilai(id: any) {
    this._apiService.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let nilaisiswa = hasil;
        this.id = nilaisiswa.id;
        this.mata_pelajaran = nilaisiswa.mata_pelajaran;
        this.nilai = nilaisiswa.nilai;
        this.id_siswa = nilaisiswa.id_siswa;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }
  editNilai() {
    let data = {
      id: this.id,
      mata_pelajaran: this.mata_pelajaran,
      nilai: this.nilai,
      id_siswa: this.id_siswa,
    };
    this._apiService.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getNilai();
        console.log('berhasil edit data nilai');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit data nilai');
      },
    });
  }
}
