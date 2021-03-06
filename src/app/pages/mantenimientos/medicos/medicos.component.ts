import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private medicoService:MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = false;
    this.medicoService.cargarMedicos().subscribe(
      resp => {
        this.medicos = resp
        this.cargando = false;
        console.log(resp)
      }
    )
  }

  abrirModal(medico) {
    console.log("Medico: " + medico)
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
  }

  buscar(termino: string ) {
    console.log('En buscar ...' + termino)
    if(termino.length == 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscarMedicos('medicos', termino).subscribe(
      resp => {
        this.medicos = resp;
      }
    )
  }

  borrarMedico( medico: Medico) {

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.medicoService.borrarMedico( medico._id ).subscribe(
    //       resp => {

    //         Swal.fire(
    //           'Medico Borrado!',
    //           `${ medico.nombre } fue eliminado correctamente.`,
    //           'success'
    //         );

    //         this.cargarMedicos();

    //       }
    //     )

    //   }
     }
    )



    this.medicoService.borrarMedico( medico._id ).subscribe(
      resp => {
        this.cargarMedicos();
        Swal.fire('Borrado', medico.nombre, 'success');
      }
    )
  }

}
