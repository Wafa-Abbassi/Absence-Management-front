import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Utilisateur from '../model/utilisateur';
import {Router} from '@angular/router';
import {UtilisateurService} from '../services/utilisateur.service';
import {PATH_LAYOUT} from '../app.constRoute';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    FormBuilder,
  ]
})
export class LoginComponent implements OnInit {
  utilisateur: Utilisateur;
  mdpCtrl: FormControl;
  emailCtrl: FormControl;
  loginForm: FormGroup;
  authentificationValide = true;

  constructor(private router: Router, private utilisateurService: UtilisateurService,
              fb: FormBuilder) {
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.mdpCtrl = fb.control('', [Validators.required]);
    this.loginForm = fb.group({
      mdp: this.mdpCtrl,
      email: this.emailCtrl
    });
  }

  connexion() {
    this.utilisateurService.getUtilisateurByEmailAndMdp(this.utilisateur).toPromise().then(u => {
      if (u != null) {
        this.utilisateurService.initialisationRole(u);
        this.authentificationValide = true;
        this.router.navigate([PATH_LAYOUT]);
      }
      else {
        this.authentificationValide = false;
      }

    });
  }
  ngOnInit() {

    this.utilisateur = new Utilisateur(0, '', '', '', '', '', 0, 0);

  }
}

