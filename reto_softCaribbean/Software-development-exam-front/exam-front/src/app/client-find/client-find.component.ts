import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { Client } from '../model/Client';
import { ClientService } from '../services/client.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-find',
  templateUrl: './client-find.component.html',
  styleUrls: ['./client-find.component.scss']
})
export class ClientFindComponent implements OnInit {

  formGroupClient: FormGroup;
  public client: Client = null;

  constructor(
    private clientService: ClientService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroupClient = this.fb.group({
      document: ['', Validators.required],
    });
  }

  searhClient(){
    const numDocument = this.formGroupClient.value.document;
    this.clientService.findByDocument(numDocument).subscribe(
      (data) => {
        this.router.navigateByUrl("/clients/client-detail/" + numDocument);
      },
      (err) => {
        console.log(err);
        this.alertService.infoAlet('Cliente no encontrado', `${err.error}`);
      }
    );
  }



}
