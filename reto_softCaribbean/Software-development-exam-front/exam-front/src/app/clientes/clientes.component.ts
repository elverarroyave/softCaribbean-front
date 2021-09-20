import { Component, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  formClient: FormGroup;

  client: Client = null;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.formClient = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      numDocument:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      gender:['', Validators.required],
    })
  }

  saveClient(){
    this.client = new Client(
      this.formClient.value.firstName,
      this.formClient.value.lastName,
      this.formClient.value.email,
      this.formClient.value.gender,
      this.formClient.value.numDocument
    )

    this.clientsService.saveClient(this.client).subscribe(data =>{
      this.alertService.successAlet('¡Cliente Agregado!', `${this.client.firstName}, agregado correctamente.`)
      this.formClient.reset();
    },err=>{
      this.alertService.errorAlert('Opss', `${err.error}`)
      console.log(err)
    })

  }

}
