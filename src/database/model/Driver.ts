export default interface Driver {
  carType: string;
  carMake: string;
  carModel: string;
  manufactureYear: string;
  color: string;
  registrationCertificate: string;
  licensePlate: string;
  photos: string[];
  vehicleInspictionReport: string;
  driverLicense: string;
  verified: boolean;
  userId: bigint;
}
