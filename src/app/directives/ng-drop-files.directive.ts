import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit(false);
  }

  // Validaciones
  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private verficarArchivo(nombre: string): boolean {
    for ( const archivo of this.archivos ) {
      if (archivo.nombreArchivo === nombre) {
        console.log(`El archivo ${nombre} ya existe!`);
        return true;
      }
    }
    return false;
  }

  private veficarTipo(tipo: string): boolean {
    return ( tipo === '' || tipo === undefined ) ? false : tipo.startsWith('image');
  }

  private verficarDrop(archivo: File): boolean {
    if (this.verficarArchivo(archivo.name) && this.veficarTipo(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

}
