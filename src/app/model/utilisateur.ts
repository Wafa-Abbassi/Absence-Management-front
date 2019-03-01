export default class Utilisateur {

  constructor(public id: number, public email: string, public mdp: string,
              public grade: string, public nom: string,
              public prenom: string, public soldeConges: number,
              public soldeRtt: number) {
  }
}
