import { Component, OnInit } from '@angular/core';
import { Driver } from '../thisModels/driver';
import { DriverService } from '../thisServices/driver.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../thisServices/message.service';
declare var window: any;

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit{
  drivers: Driver[] = [];
  selectedDriver : Driver = this.reset();
  showAddForm: boolean = false;
  newDriver: Driver = this.reset();
  showEditForm: boolean = false;
  addDriverModal: any;
  backupDriver: Driver = this.reset();
  editDriverModal: any;
  deleteDriverModal: any;
  confirmationIdCard: string = '';
  
  constructor(
    private driverService: DriverService,
    private messageService: MessageService
  ){}
  
  getDrivers(): void{
    this.driverService.getDrivers()
    .subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }
  
  ngOnInit(){
    this.getDrivers();
    this.addDriverModal = new window.bootstrap.Modal(
      document.getElementById('addDriverModal')
    );
    this.editDriverModal = new window.bootstrap.Modal(
      document.getElementById('editDriverModal')
    );
    this.deleteDriverModal = new window.bootstrap.Modal(
      document.getElementById('deleteDriverModal')
    );
  }
  
  toggleAdd(): void {
    this.newDriver = this.reset();
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
  }
  
  reset(): Driver {
    return { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  }
  
  cancel(): void{
    this.newDriver = this.reset();
    this.selectedDriver = this.reset();
    this.showAddForm = false;
    this.showEditForm = false;
  }
  
  openAddModal(): void {
    this.addDriverModal.show();
  }
  
  confirmAdd(): void {
    this.addDriverModal.hide();
    this.driverService.createDriver(this.newDriver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver created successfully.',
          type: 'alert alert-success'
        });
        this.newDriver = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error creating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  toggleEdit(driver: Driver) {
    this.backupDriver = { ...driver }; 
    this.selectedDriver = { ...driver }; 
    this.showEditForm = !this.showEditForm;
    this.showAddForm = false;
  }
  
  openEditModal(): void {
    console.log(this.backupDriver);
    console.log(this.selectedDriver);
    this.editDriverModal.show();
  }
  
  confirmEdit(): void {
    this.editDriverModal.hide();
    this.driverService.updateDriver(this.selectedDriver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver updated successfully.',
          type: 'alert alert-success'
        });
        this.selectedDriver = this.reset();
        this.backupDriver = this.reset();
        this.showEditForm = false;
        this.showAddForm = false;
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  openDeleteModal(driver: Driver): void {
    this.confirmationIdCard = '';
    this.selectedDriver = { ...driver }; 
    this.deleteDriverModal.show();
  }

  confirmDeleteModal(): void {
    if(this.confirmationIdCard===this.selectedDriver.idCard){
      this.confirmDelete(this.selectedDriver);
    } else {
      this.messageService.sendMessage({
        text: 'IDs do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.deleteDriverModal.hide();
  }
  
  confirmDelete(driver: Driver): void {
    this.driverService.deleteDriver(driver).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Driver deleted successfully.',
          type: 'alert alert-success'
        });
        this.getDrivers();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
}