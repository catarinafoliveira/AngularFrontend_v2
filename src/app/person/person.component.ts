import { Component, OnInit } from '@angular/core';
import { Person } from '../thisModels/person';
import { PersonService } from '../thisServices/person.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../thisServices/message.service';
import { DriverService } from '../thisServices/driver.service';
declare var window: any;

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit{
  persons: Person[] = [];
  selectedPerson : Person = this.reset();
  showAddForm: boolean = false;
  newPerson: Person = this.reset();
  isDriver: boolean = false;
  showEditForm: boolean = false;
  addPersonModal: any;
  backupPerson: Person = this.reset();
  editPersonModal: any;
  deletePersonModal: any;
  confirmationIdCard: string = '';
  
  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private driverService: DriverService
  ){}
  
  getPersons(): void{
    this.personService.getPersons()
    .subscribe((data: Person[]) => {
      this.persons = data;
    });
  }
  
  ngOnInit(){
    this.getPersons();
    this.addPersonModal = new window.bootstrap.Modal(
      document.getElementById('addPersonModal')
    );
    this.editPersonModal = new window.bootstrap.Modal(
      document.getElementById('editPersonModal')
    );
    this.deletePersonModal = new window.bootstrap.Modal(
      document.getElementById('deletePersonModal')
    );
  }
  
  toggleAdd(): void {
    this.newPerson = this.reset();
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
  }
  
  reset(): Person {
    return { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  }
  
  cancel(): void{
    this.newPerson = this.reset();
    this.selectedPerson = this.reset();
    this.showAddForm = false;
    this.showEditForm = false;
  }
  
  openAddModal(): void {
    this.addPersonModal.show();
  }
  
  confirmAdd(): void {
    this.addPersonModal.hide();
    if(this.isDriver){
      this.driverService.createDriver(this.newPerson).subscribe({
        next: () => {
          this.messageService.sendMessage({
            text: 'Driver created successfully.',
            type: 'alert alert-success'
          });
          this.newPerson = this.reset();
          this.showEditForm = false;
          this.showAddForm = false;
          this.getPersons();
        },
        error: (err) => {
          this.messageService.sendMessage({
            text: 'Error creating driver: ' + err.error.error,
            type: 'alert alert-danger'
          });
        }
      });
    } else {
      this.personService.createPerson(this.newPerson).subscribe({
        next: () => {
          this.messageService.sendMessage({
            text: 'Person created successfully.',
            type: 'alert alert-success'
          });
          this.newPerson = this.reset();
          this.showEditForm = false;
          this.showAddForm = false;
          this.isDriver = false;
          this.getPersons();
        },
        error: (err) => {
          this.messageService.sendMessage({
            text: 'Error creating person: ' + err.error.error,
            type: 'alert alert-danger'
          });
        }
      });
    }
  }
  
  toggleEdit(person: Person) {
    this.backupPerson = { ...person }; 
    this.selectedPerson = { ...person }; 
    this.showEditForm = !this.showEditForm;
    this.showAddForm = false;
  }
  
  openEditModal(): void {
    this.editPersonModal.show();
  }
  
  confirmEdit(): void {
    this.editPersonModal.hide();
    this.personService.updatePerson(this.selectedPerson).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person updated successfully.',
          type: 'alert alert-success'
        });
        this.selectedPerson = this.reset();
        this.backupPerson = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getPersons();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  openDeleteModal(person: Person): void {
    this.confirmationIdCard = '';
    this.selectedPerson = { ...person }; 
    this.deletePersonModal.show();
  }
  
  confirmDeleteModal(): void {
    if(this.confirmationIdCard===this.selectedPerson.idCard){
      this.confirmDelete(this.selectedPerson);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.deletePersonModal.hide();
  }
  
  confirmDelete(person: Person): void {
    this.personService.deletePerson(person).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Person deleted successfully.',
          type: 'alert alert-success'
        });
        this.getPersons();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting person: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
}