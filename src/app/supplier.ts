export class Supplier {
  public id!: number;
  public suppierCode!: string;
  public supplierName!: string;
  public supplierDescription!: string;
  public country!: string;
  public address!: string;

  constructor(
    id: number,
    suppierCode: string,
    supplierName: string,
    supplierDescription: string,
    country: string,
    address: string
  ) {
    this.id = id;
    this.suppierCode = suppierCode;
    this.supplierName = supplierName;
    this.supplierDescription = supplierDescription;
    this.country = country;
    this.address = address;
  }
}
