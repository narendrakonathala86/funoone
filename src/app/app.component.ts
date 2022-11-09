import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'funoone';

  @Input()
  showalert: boolean;

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl(''),
  });

  subscribers: AngularFireList<any>;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private db: AngularFireDatabase, private modalService: MdbModalService) {
    this.db = db;
    this.subscribers =  db.list('contacts');
    this.showalert = false;
  }

  sendMessage() {
    this.subscribers.push(JSON.stringify(this.contactForm.value));

    this.showalert = true;
    this.contactForm.reset();

    setTimeout(() => {
      this.showalert = false;
    }, 3000);

  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

}
