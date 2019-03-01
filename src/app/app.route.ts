import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AbsencesManagementComponent} from './absences-management/absences-management.component';
import {
  PATH_ABCENCES,
  PATH_ABCENCES_AJOUT,
  PATH_ABCENCES_SHOW,
  PATH_ABCENCES_UPDATE,
  PATH_FERIE,
  PATH_HOME,
  PATH_JOURS_FERIE_AJOUT,
  PATH_LAYOUT,
  PATH_LOGIN,
  PATH_PLANNING,
  PATH_SYNTHETIQUE,
  PATH_VALIDATION
} from './app.constRoute';
import {AbsenceManagementUpdateComponent} from './absences-management/absence-management-update/absence-management-update.component';
import {AbsenceManagementShowComponent} from './absences-management/absence-management-show/absence-management-show.component';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {UtilisateurGuard} from './guards/utilisateur.guard';
import {PlanningComponent} from './planning/planning.component';
import {ValidationDemandeComponent} from './validation-demande/validation-demande.component';
import {JoursFeriesComponent} from './jours-feries/jours-feries.component';
import {SynthetiqueComponent} from './synthetique/synthetique.component';
import {DemandeAbsenceComponent} from './demande-absence/demande-absence.component';
import {CounterComponent} from './counter/counter.component';
import {CreationFerieRttComponent} from './creation-ferie-rtt/creation-ferie-rtt.component';

export const ROUTES: Routes = [
  {path: PATH_LOGIN, component: LoginComponent},
  {
    path: PATH_LAYOUT, component: LayoutComponent,
    canActivateChild: [UtilisateurGuard],
    children: [
      {path: PATH_HOME, component: HomeComponent},
      {
        path: PATH_ABCENCES, component: AbsencesManagementComponent,
        children: [
          {path: '', component: CounterComponent}
        ]
      },
      {path: PATH_ABCENCES + '/' + PATH_ABCENCES_AJOUT, component: DemandeAbsenceComponent},
      {path: PATH_ABCENCES + '/' + PATH_ABCENCES_UPDATE, component: AbsenceManagementUpdateComponent},
      {path: PATH_ABCENCES + '/' + PATH_ABCENCES_SHOW, component: AbsenceManagementShowComponent},
      {
        path: PATH_PLANNING, component: PlanningComponent,
        children: [
          {path: '', component: CounterComponent}
        ]
      },
      {path: PATH_VALIDATION, component: ValidationDemandeComponent},
      {path: PATH_FERIE, component: JoursFeriesComponent},
      {path: PATH_FERIE + '/' + PATH_JOURS_FERIE_AJOUT, component: CreationFerieRttComponent},
      {path: PATH_SYNTHETIQUE, component: SynthetiqueComponent}
    ]
  },

];

