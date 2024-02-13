export class CreateMarketerModel {
  name: string;
  fiscalName: string;
  cif: string;
  email: string;

  constructor(marketer: { name: string; fiscalName: string; cif: string; email: string }) {
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
  }
}
