export class EditContactModel {
  name: string;
  email?: string;
  phone?: string;

  constructor(contact: { name: string; email?: string; phone?: string }) {
    this.name = contact.name;
    this.email = contact.email;
    this.phone = contact.phone;
  }
}
