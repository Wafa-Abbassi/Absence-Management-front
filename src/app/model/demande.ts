export class DemandeAbsence {
  public dateDeb: Date;
  public dateFin: Date;
  public type: String;
  public motif: String;
  constructor(dateDeb: Date, dateFin: Date, type: String, motif: String) {
    this.dateDeb = dateDeb;
    this.dateFin = dateFin;
    this.type = type;
    this.motif = motif;
  }
}
