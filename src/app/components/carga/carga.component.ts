import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { UploadFilesService } from '../../services/upload-files.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  drop = false;
  archivos: FileItem[] = [];
  constructor(
    public service: UploadFilesService
  ) { }

  ngOnInit() {
  }

  cargarArchivos() {
    this.service.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
