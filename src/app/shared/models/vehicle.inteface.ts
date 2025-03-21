import { Marque } from "./marque.interface";
import { TypeVoiture } from "./type.interface";

export interface Vehicle {
    _id: string,
    registrationNumber: string,
    state: string,
    description: string,
    vehicleBrandId: Marque,
    vehicleTypeId: TypeVoiture
}