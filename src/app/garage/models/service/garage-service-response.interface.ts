export interface GarageServiceInterface {
  "_id": string,
  "name": string,
  "basePrice": number,
  "description": string,
  "__v": number
}

export interface GarageServiceResponseInterface {
  "total": number,
  "page": number,
  "totalPages": number,
  "data": GarageServiceInterface[]
}

