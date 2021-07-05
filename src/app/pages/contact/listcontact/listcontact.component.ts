import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsUpdate } from '../../../modele/contacts';
import {  ContactsService } from '../../../services/contacts.service';
import { UtilisateursService } from '../../../services/utilisateurs.service';

@Component({
  selector: 'ngx-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.scss']
})
export class ListcontactComponent implements OnInit {
contacts;
datacontact;
closeResult:string;
donneesUser;
contact;
tiko :'1995-01-0555';


con : any;
  constructor(private contactService : ContactsService,
    private modalService: NgbModal,private utilisateurService : UtilisateursService,private toastrService: NbToastrService) {
    }
    
    config: NbToastrConfig;
    
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'success';
    statusSupprim: NbComponentStatus = 'danger';
    
    titleSupprim = 'Supression d\'un contact !';
    contentSupprim = `Contact supprimé avec suucès!`;

    title = 'Ajout d\'un nouveau contact !';
    content = `Contact ajouté avec suucès!`;
    
    
    
  ngOnInit() {
    this.contactService.getAllContact(localStorage.getItem('idEntite')).subscribe((data) => {
      this.contacts = data;
      console.log(this.contacts)
    }, (err) => {
      console.log(err);
    });

}


cont : ContactsUpdate={
DateDeNaissance: ''
}
open(id) {
  this.contactService.getContact(id).subscribe((data) => {
    this.datacontact = data;
    this.cont.DateDeNaissance = data['dateDeNaissance']
    this.utilisateurService.getUtilisateurById(this.datacontact.idUser).subscribe((data) => {

  }, (err) => {
    console.log(err);
  });


  }, (err) => {
    console.log(err);
  });
  this.modalService.open( {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

changestatut(id){
  this.contactService.changerStatutUtilisateur(id).subscribe((data) => {
     console.log(data)
     this.contactService.getAllContact(localStorage.getItem('id')).subscribe((data) => {
      this.contacts = data;
      console.log(this.contacts)
    }, (err) => {
      console.log(err);
    });
  }, (err) => {
    console.log(err);
  });

}

supprimeruser(id){
  this.contactService.DeleteContact(id).subscribe((data1) => {
    this.ToastSuppression(this.statusSupprim, this.titleSupprim, this.contentSupprim);
     this.contactService.getAllContact(localStorage.getItem('id')).subscribe((data) => {
      this.contacts = data;
    }, (err) => {
      console.log(err);
    });
  }, (err) => {
    console.log(err);
  });
}

private ToastSuppression(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `${titleContent}`,
    config);
}

save(form :NgForm){
console.log(form)
  console.log(this.con)
}
}


