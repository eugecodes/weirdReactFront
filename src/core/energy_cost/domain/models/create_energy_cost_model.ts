export class CreateEnergyCostModel {
  concept: string;
  amount: number;

  constructor(energyCost: { concept: string; amount: number }) {
    this.concept = energyCost.concept;
    this.amount = energyCost.amount;
  }
}
