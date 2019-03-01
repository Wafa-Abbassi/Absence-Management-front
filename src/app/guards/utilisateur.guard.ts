import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UtilisateurService} from '../services/utilisateur.service';

@Injectable()
export class UtilisateurGuard implements CanActivateChild {

  constructor(private router: Router,  private utilisateurService: UtilisateurService) {
  }


  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.utilisateurService.getUtilisateurCourant() == null) {
      this.router.navigate(['/connexion']);
      return false;
    }
    else {

      return true;
    }

  }
}
