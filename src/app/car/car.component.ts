import { Component } from '@angular/core';
import { Car } from '../thisModels/car';
import { CarService } from '../thisServices/car.service';
import { MessageService } from '../thisServices/message.service';
import { DriverService } from '../thisServices/driver.service';
import { Driver } from '../thisModels/driver';
import { FormsModule } from '@angular/forms';
import { DriverComponent } from '../driver/driver.component';
declare var window: any;

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars: Car[] = [];
  edit: boolean = false;
  add: boolean = false;
  drivers: Driver[] = [];
  newCar: Car = this.reset();
  addCarModal: any;
  selectedDriver: Driver = { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  activeCar: Car = this.reset();
  backupCar: Car = this.reset();
  backupSelectedDriver: Driver = { _id:'', name: '', idCard: '', status: '', __t: '', licence:'' };
  editCarModal: any;
  confirmationPlate: string = "";
  deleteModalInstance: any;
  
  constructor(
    private messageService: MessageService,
    private carService: CarService,
    private driverService: DriverService
  ){}
  
  reset(): Car {
    return {_id:"", date:"", plate:"",ownerIdCard:"",ownerLicence:"", ownerName:"",seeOwner:false};
  }
  
  getCars(): void {
    this.carService.getCars()
    .subscribe((data: Car[]) => {
      this.cars = data.map(car => ({ ...car, seeOwner: false }));
    });
  }
  
  getDrivers(): void{
    this.driverService.getDrivers()
    .subscribe((data: Driver[]) => {
      this.drivers = data;
    });
  }
  
  ngOnInit(){
    this.getCars();
    this.addCarModal = new window.bootstrap.Modal(
      document.getElementById('addCarModal')
    );
    this.editCarModal = new window.bootstrap.Modal(
      document.getElementById('editCarModal')
    );
    this.deleteModalInstance = new window.bootstrap.Modal(
      document.getElementById('deleteCarModal')
    );
  }
  
  toggleSee(car: Car): void{
    car.seeOwner = !car.seeOwner;
  }
  
  toggleEdit(car: Car): void{
    this.getDrivers();
    this.activeCar = { ...car };
    this.activeCar.date = this.unformatDate(this.activeCar.date);
    this.backupCar = { ...car };
    this.backupCar.date = this.unformatDate(this.backupCar.date);
    this.backupSelectedDriver.name = car.ownerName;
    this.backupSelectedDriver.idCard = car.ownerIdCard;
    this.edit = !this.edit;
  }
  
  showDeleteModal(car: Car): void {
    this.activeCar = car;
    this.confirmationPlate = '';
    this.deleteModalInstance.show();
  }
  
  toggleAdd(): void{
    this.newCar = this.reset();
    this.getDrivers();
    this.add = !this.add;
  }
  
  cancelAdd(): void{
    this.newCar = this.reset();
    this.add = false;
  }
  
  showAddModal(): void {
    this.addCarModal.show();
    this.newCar.date = this.formatDate(this.newCar.date);
    this.updateSelectedDriver(this.newCar.ownerLicence);
  }
  
  formatDate(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  
  unformatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }
  
  updateSelectedDriver(licence: string) {
    const driver = this.drivers.find(d => d.licence === licence);
    if (driver) {
      this.selectedDriver.name = driver.name;
      this.selectedDriver.idCard = driver.idCard;
    } else {
      this.selectedDriver.name = '';
      this.selectedDriver.idCard = '';
    }
  }
  
  confirmAdd(): void {
    this.addCarModal.hide();
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car created successfully.',
          type: 'alert alert-success'
        });
        this.newCar = this.reset();
        this.getCars();
        this.edit = false;
        this.add = false;
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error creating car: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  showEditModal(): void {
    this.updateSelectedDriver(this.activeCar.ownerLicence);
    this.activeCar.date = this.formatDate(this.activeCar.date);
    this.backupCar.date = this.formatDate(this.backupCar.date);
    this.editCarModal.show();
  }
  
  cancelEdit(): void{
    
  }
  
  confirmEdit(): void {
    this.editCarModal.hide();
    this.carService.updateCar(this.activeCar).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car updated successfully.',
          type: 'alert alert-success'
        });
        this.activeCar = this.reset();
        this.backupCar = this.reset();
        this.edit = false;
        this.add = false;
        this.getCars();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error updating driver: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
  
  confirmDeleteModal(): void {
    if (this.confirmationPlate === this.activeCar.plate) {
      this.confirmDelete(this.activeCar);
    } else {
      this.messageService.sendMessage({
        text: 'Plates do not match. Canceling delete.',
        type: 'alert alert-danger'
      });
    }
    this.deleteModalInstance.hide();
    this.confirmationPlate="";
  }
  
  confirmDelete(car: Car): void {
    this.carService.deleteCar(car).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car deleted successfully.',
          type: 'alert alert-success'
        });
        this.getCars();
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error deleting car: ' + err.error.error,
          type: 'alert alert-danger'
        });
      }
    });
  }
}
