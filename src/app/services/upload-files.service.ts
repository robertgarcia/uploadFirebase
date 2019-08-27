import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private CARPETA_IMAGENES = 'img';
  constructor(
    private db: AngularFirestore
  ) { }

  private guardarImagen( imagen: { nombre: string, url: string } ) {
    this.db.collection(`/${ this.CARPETA_IMAGENES }`).add(imagen);
  }
}
