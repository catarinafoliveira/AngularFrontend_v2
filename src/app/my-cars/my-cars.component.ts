import { Component, OnInit } from '@angular/core';
import { Car } from '../thisModels/car';
import { FormsModule } from '@angular/forms';
import { MyCarService } from '../thisServices/my-car.service';
import { MessageService } from '../thisServices/message.service';
import { AuthenticatorService } from '../thisServices/authenticator.service';
declare var window: any;

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.css'
})
export class MyCarsComponent implements OnInit{

  empty: boolean = true;
  cars: Car[] = [];
  add: boolean = false;
  newCar: Car = this.reset();
  addModal: any;

  constructor(
    private messageService: MessageService,
    private myCarService: MyCarService,
    private authenticatorService: AuthenticatorService
  ){}

  ngOnInit(): void {
    this.addModal = new window.bootstrap.Modal(
      document.getElementById('confirmModal')
    );
    this.getCars();
  }

  getCars(): void {
    this.myCarService.getCars(this.authenticatorService.getUserLicence())
    .subscribe((data: Car[]) => {
      this.cars = data.map(car => ({ ...car, seeOwner: false }));
      if(this.cars.length==0){
        this.empty = true;
    } else {
        this.empty = false;
    }
    });
  }  

  reset(): Car {
    return {_id:"", date:"", plate:"",ownerIdCard:"",ownerLicence:"", ownerName:"",seeOwner:false};
  }
  
  toggleAdd(): void {
    this.newCar = this.reset();
    this.add = !this.add;
  }
  
  showConfirmModal(): void {
    this.addModal.show();
    this.newCar.date = this.formatDate(this.newCar.date);
    this.newCar.ownerLicence = this.authenticatorService.getUserLicence();
  }

  formatDate(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  
  cancelAdd(): void {
    this.newCar = this.reset();
  }
  
  confirmSubmit(): void {
    this.addModal.hide();
    this.myCarService.createCar(this.newCar).subscribe({
      next: () => {
        this.messageService.sendMessage({
          text: 'Car created successfully.',
          type: 'alert alert-success'
        });
        this.newCar = this.reset();
        this.getCars();
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
}
