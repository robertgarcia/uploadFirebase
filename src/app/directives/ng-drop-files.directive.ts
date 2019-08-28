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
    this.prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    const transferencia = this.getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this.extraerArchivos(transferencia.files);
    this.prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos( lista: FileList ) {
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames( lista ) ) {
      const temp = lista[propiedad];
      if ( this.verficarDrop(temp)) {
        const nuevo = new FileItem( temp );
        this.archivos.push(nuevo);
      }
    }
    console.log(this.archivos);
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
        return false;
      }
    }
    return true;
  }

  private veficarTipo(tipo: string): boolean {
    return ( tipo === '' || tipo === undefined ) ? false : tipo.startsWith('image');
  }

  private verficarDrop(archivo: File): boolean {
    console.log(archivo);
    if (this.verficarArchivo(archivo.name) && this.veficarTipo(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

}
