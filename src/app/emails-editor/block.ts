export class Block {
  address: string;
  isValid: boolean;

  constructor(address: string) {
    this.address = address;
    this.isValid = this.validate();
  }

  validate(): boolean {
    return this.address.match(/[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]{2,}/i) ? true : false;
  }
}
