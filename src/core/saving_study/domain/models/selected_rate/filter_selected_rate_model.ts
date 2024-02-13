export class FilterSelectedRateModel {
  savingStudyId?: number;
  marketerName?: string;
  rateName?: string;
  hasContractualCommitment?: boolean;
  renewable?: boolean;
  netMetering?: boolean;

  constructor(filterSelectedRate: {
    savingStudyId?: number;
    marketerName?: string;
    rateName?: string;
    hasContractualCommitment?: boolean;
    renewable?: boolean;
    netMetering?: boolean;
  }) {
    this.marketerName = filterSelectedRate.marketerName;
    this.rateName = filterSelectedRate.rateName;
    this.hasContractualCommitment = filterSelectedRate.hasContractualCommitment;
    this.renewable = filterSelectedRate.renewable;
    this.netMetering = filterSelectedRate.netMetering;
  }
}
