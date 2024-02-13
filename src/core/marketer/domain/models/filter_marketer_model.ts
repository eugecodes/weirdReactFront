export class FilterMarketerModel {
  name?: string;
  fiscalName?: string;
  cif?: string;
  email?: string;
  enabled?: boolean;
  createdAt?: string;
  responsible?: string;

  constructor(marketer: { name: string; fiscalName: string; cif: string; email: string; enabled: boolean; createdAt: string; responsible?: string }) {
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.enabled = marketer.enabled;
    this.createdAt = marketer.createdAt;
    this.responsible = marketer.responsible;
  }
}
