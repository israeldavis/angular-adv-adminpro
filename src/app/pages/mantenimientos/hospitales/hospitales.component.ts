import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando = true;
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(
      hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      }
    )
  }

  guardarCambios( hospital: Hospital) {
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre).subscribe(
      resp => {
        this.cargarHospitales();
        Swal.fire('Actaulizado', hospital.nombre, 'success');
      }
    )
  }

  eliminarHospital( hospital: Hospital) {
    this.hospitalService.borrarHospital( hospital._id ).subscribe(
      resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      }
    )
  }

  async abrirSweetAlert() {
    const {value = ''}= await Swal.fire<string>({
      title: 'Crar Hospital',
      text: 'Ingresar el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })

    if(value.trim().length > 0) {
      this.hospitalService.crearHospital( value ).subscribe(
        (resp: any) => {
          this.cargarHospitales();
          Swal.fire('Actualizado', `${resp.nombre} creado`, 'success');
        }
      )
    }
  }

  abrirModal(hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }

  buscar(termino: string) {
    console.log('En buscar ...' + termino)
    if(termino.length == 0) {
      return this.cargarHospitales();
    }

    this.busquedasService.buscarHospitales('hospitales', termino).subscribe(
      resp => {
        this.hospitales = resp;
      }
    )
  }

}
