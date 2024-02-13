export class FilterEnergyCostModel {
  concept?: string;
  amount?: string;
  enabled?: boolean;
  createdAt?: string;
  responsible?: string;

  constructor(energyCost: { concept: string; amount: string; enabled: boolean; createdAt: string; responsible?: string }) {
    this.concept = energyCost.concept;
    this.amount = energyCost.amount;
    this.enabled = energyCost.enabled;
    this.createdAt = energyCost.createdAt;

    if (energyCost.responsible) {
      this.responsible = energyCost.responsible;
    }
  }
}
