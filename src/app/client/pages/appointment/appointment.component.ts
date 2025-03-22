import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { VehicleStoreService } from '../../services/vehicle-store.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Service } from '../../../shared/models/service.interface';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CurrencyPipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../../../shared/models/User.interface';
import { SuccessAlertComponent } from '../../components/success-alert/success-alert.component';

@Component({
  selector: 'app-appointment',
  imports: [SuccessAlertComponent, CurrencyPipe, MatCheckboxModule, MatButtonModule, PageHeaderComponent, MatCardModule, MatStepperModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  private _formBuilder = inject(FormBuilder);
  private vehicleStore = inject(VehicleStoreService);
  private http = inject(HttpClient);

  success = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  vehicles = this.vehicleStore.getVehicles();
  services: WritableSignal<Service[]> = signal<Service[]>([]);

  getVehicles() {
    return this.vehicles().filter(v => v.state == 'free')
  }

  total: Signal<number> = computed(() => {
    return this.services()
      .filter(s => s.isSelected)
      .reduce((total, s) => total + s.basePrice, 0)
  });
  
  firstFormGroup = this._formBuilder.group({
    vehicleId: ['', Validators.required],
  });

  getVehicleId() {
    const v: string = this.firstFormGroup.invalid ? '' : this.firstFormGroup.value.vehicleId || '';
    return v;
  }

  getServices() {
    if(this.firstFormGroup.valid){
      let type = ''
      this.isLoading.set(true);
      const car = this.vehicles().find(c => c._id == this.getVehicleId());
      if(car?.vehicleTypeId) type = car.vehicleTypeId._id;
      const params = new HttpParams().set('t', type);
      this.http.get<Service[]>(`${environment.apiUrl}/api/services/vehicles/types`, {params}).subscribe((response: any) => {
        this.services.set(response.data);      
        this.services().map((s) => s.isSelected = false);
        this.isLoading.set(false);
      });
    }
  }

  updateCheck(index: number){
    this.services.update(services => 
      services.map((service, i) => 
        i === index ? { ...service, isSelected: !service.isSelected } : service
      )
    );
  }

  saveOrder(stepper: MatStepper){
    this.isLoading.set(true);
    var sIds: string[] = [];
    this.services().forEach((s) => {
      if(s.isSelected){
        sIds.push(s._id);
      }
    });
    const token = localStorage.getItem('JWT_TOKEN');
    let user: UserInterface;
    if(token){
      user = {
        ...jwtDecode(token)
      };
      this.http.post(`${environment.apiUrl}/api/clients/${user.id}/orders`, {
        vehicleId: this.getVehicleId(),
        serviceIds: sIds
      }).subscribe(() => {
        this.vehicleStore.fetchVehicles();
        this.isLoading.set(false);
        stepper.reset();
        this.success.set(true);
        setTimeout(() => this.success.set(false), 2000);
      });
    }
  }
}
