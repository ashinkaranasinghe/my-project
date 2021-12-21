export class Brand {
  public id!: number;
  public brandName!: string;

  constructor(id: number, brandName: string) {
    this.id = id;
    this.brandName = brandName;
  }
}
