export class Block {
  address: string;
  isValid: boolean;

  constructor(address: string) {
    this.address = address;
    this.isValid = this.validate();
  }

  validate(): boolean {
    return this.address.match(/.+@.+\..+/i) ? true : false;
  }
}