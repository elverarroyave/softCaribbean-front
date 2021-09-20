import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { ClientService } from '../services/client.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../model/Client';
import { ClientRequest } from '../model/clientRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  //Variables
  formClientDetail: FormGroup;
  clientRquest: ClientRequest = new ClientRequest();
  clientId: string;

  isEdit: boolean = false;

  constructor(
    private clientsService: ClientService,
    private activateddRoute: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder,
    private ruote: Router
  ) { }

  ngOnInit(): void {
    this.clientId = this.activateddRoute.snapshot.params.id;
    //Find client by id
    const document: string = this.activateddRoute.snapshot.params.document;
    this.clientsService.findByDocument(document).subscribe(
      (data) => {
        this.clientRquest = data;
        this.loadData();
      },
      (err) => {
        console.log(err)
      }
    )

    //Formulario
    this.formClientDetail = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      gender: ['', Validators.required],
      document: ['', Validators.required],
    });

    this.formClientDetail.disable();

  }

  private findCurrentClient(){

  }

  loadData() {
    this.formClientDetail.setValue({
      firstName: this.clientRquest.firstName,
      lastName: this.clientRquest.lastName,
      email: this.clientRquest.email,
      gender: this.clientRquest.gender,
      document: this.clientRquest.numDocument
    });
  }



  editClient(){

    const document: number = this.clientRquest.numDocument;
    console.log(this.formClientDetail.value)
    let clientToUpdate: Client = new Client(
      this.formClientDetail.value.firstName,
      this.formClientDetail.value.lastName,
      this.formClientDetail.value.email,
      this.formClientDetail.value.gender,
      this.formClientDetail.value.numDocument
    )
    this.clientsService.updateClient(document, clientToUpdate).subscribe(
      (data) => {
        this.alertService.infoAlet(
          '¡Cliente Actualizado!',
          `${this.formClientDetail.value.firstName}, actualizado correctamente.`
        );
      },
      (err) => {
        this.alertService.errorAlert('Ops', `${err.error}`);
        console.log(err);
      }
    );
  }

  delete(){

    const document: number = this.clientRquest.numDocument;

    Swal.fire({
      title: `¿Eliminar ${this.clientRquest.firstName}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed){
        this.clientsService.deleteClient(document).subscribe(data=>{
          this.alertService.infoAlet('Eliminar Cliente!', `${this.clientRquest.firstName}, eliminado correctamente.`)
        },err=>{
          this.alertService.errorAlert('Error :/',`Hay un error para eliminar el cliente, ${this.clientRquest.firstName}.`)
        })
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info')
      }
    })
  }


  isEditable() {
    this.isEdit = true;
    this.formClientDetail.enable();
  }

  noEditable() {
    this.isEdit = false;
    this.formClientDetail.disable();
  }

}
