import { Component } from '@angular/core';
import { Driver } from '../thisModels/driver';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { MessageService } from '../thisServices/message.service';
import { MyDriverService } from '../thisServices/my-driver.service';
import { FormsModule } from '@angular/forms';
declare var window: any;

@Component({
  selector: 'app-my-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-driver.component.html',
  styleUrl: './my-driver.component.css'
})
export class MyDriverComponent {
  title: string = "";
  driver: Driver = this.reset();
  selectedAction: string = "";
  editDriver: Driver = this.reset();
  editDriverModal: any;
  confirmationIdCard: string = "";
  deleteDriverModal: any;
  
  constructor(
    private messageService: MessageService,
    private authenticatorService: AuthenticatorService,
    private myDriverService: MyDriverService
  ) {}

  ngOnInit(){
    this.getDriver('getById');
    this.editDriverModal = new window.bootstrap.Modal(
      document.getElementById('editDriverModal')
    );
    this.deleteDriverModal = new window.bootstrap.Modal(
      document.getElementById('deleteDriverModal')
    );
  }
  
  reset(): Driver{
    return {_id:"",name:"",idCard:"",__t:"",licence:"",status:""};
  }
  
  getUserRole(): string | null{
    return this.authenticatorService.getUserRole();
  }
  
  getDriver(actionSelected: string): any{
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
      case 'getByLicence': {
        path = 'dl';  
        param = this.authenticatorService.getUserLicence();
        break;
      }
    };
    this.title = 'Get data by ' + path + ': '+param;
    const url = `${path}/${param}`;
    
    this.myDriverService.getOne(url)
    .subscribe((data: Driver) => {
      this.driver = data;
      console.log(data);
    });
  }
  
  updateDriver(): void{
    this.title = 'Update driveral data';
    this.editDriver = { ...this.driver };
    this.selectedAction = "updateDriver";
  }
  
  showEditModal(): void {
    this.editDriverModal.show();
  }
  
  cancelEdit(): void {
    this.selectedAction = "";
  }

  confirmEdit(): void{
    console.log(this.editDriver);
    this.editDriverModal.hide();
    this.myDriverService.updateDriver(this.editDriver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver updated successfully.',
          type: 'alert alert-success'
        });
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }

  deleteDriver(): void {
    this.selectedAction = "deleteDriver";
    this.title = 'Delete driveral data (mark inactive)';
  }

  showDeleteModal(): void {
    this.deleteDriverModal.show();
  }

  confirmDeleteModal(): void {
    if(this.confirmationIdCard===this.driver.idCard){
      this.confirmDelete(this.driver);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.deleteDriverModal.hide();
  }

  confirmDelete(driver: Driver): void {
    this.myDriverService.deleteDriver(driver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver marked inactive.',
          type: 'alert alert-success'
        });
        this.logout();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting driver: ' + err.error.error,
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
