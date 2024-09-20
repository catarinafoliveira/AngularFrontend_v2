import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { MessageService } from '../thisServices/message.service';
import { Person } from '../thisModels/person';
import { MyPersonService } from '../thisServices/my-person.service';
import { FormsModule } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'app-my-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-person.component.html',
  styleUrl: './my-person.component.css'
})
export class MyPersonComponent implements OnInit{
  title: string = "";
  person: Person = this.reset();
  selectedAction: string = "";
  editPerson: Person = this.reset();
  editPersonModal: any;
  confirmationIdCard: string = "";
  deletePersonModal: any;
  
  constructor(
    private messageService: MessageService,
    private authenticatorService: AuthenticatorService,
    private myPersonService: MyPersonService
  ) {}

  ngOnInit(){
    this.getPerson('getById');
    this.editPersonModal = new window.bootstrap.Modal(
      document.getElementById('editPersonModal')
    );
    this.deletePersonModal = new window.bootstrap.Modal(
      document.getElementById('deletePersonModal')
    );
  }
  
  reset(): Person{
    return {_id:"",name:"",idCard:"",__t:"",licence:"",status:""};
  }
  
  getUserRole(): string | null{
    return this.authenticatorService.getUserRole();
  }
  
  getPerson(actionSelected: string): any{
    this.selectedAction = actionSelected;
    var path;
    var param;
    
    switch(actionSelected){
      case 'getById': {
        path = 'id'; 
        param = this.authenticatorService.getUserId();
        break;
      }
      case 'getByName': {
        path = 'name';  
        param = this.authenticatorService.getUserName();
        break;
      };
      case 'getByIdCard': {
        path = 'idcard';  
        param = this.authenticatorService.getUserIdCard();
        break;
      }
    };
    this.title = 'Get data by ' + path + ': '+param;
    const url = `${path}/${param}`;
    
    this.myPersonService.getOne(url)
    .subscribe((data: Person) => {
      this.person = data;
    });
  }
  
  updatePerson(): void{
    this.title = 'Update personal data';
    this.editPerson = { ...this.person };
    this.selectedAction = "updatePerson";
  }
  
  showEditModal(): void {
    this.editPersonModal.show();
  }
  
  cancelEdit(): void {
    this.selectedAction = "";
  }

  confirmEdit(): void{
    console.log(this.editPerson);
    this.editPersonModal.hide();
    this.myPersonService.updatePerson(this.editPerson).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person updated successfully.',
          type: 'alert alert-success'
        });
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }

  deletePerson(): void {
    this.selectedAction = "deletePerson";
    this.title = 'Delete personal data (mark inactive)';
  }

  showDeleteModal(): void {
    this.deletePersonModal.show();
  }

  confirmDeleteModal(): void {
    if(this.confirmationIdCard===this.person.idCard){
      this.confirmDelete(this.person);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.deletePersonModal.hide();
  }

  confirmDelete(person: Person): void {
    this.myPersonService.deletePerson(person).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person marked inactive.',
          type: 'alert alert-success'
        });
        this.logout();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }

  logout(): void {
    this.authenticatorService.logout();
    window.location.reload();
  }
}
