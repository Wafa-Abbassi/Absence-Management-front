import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomeComponent} from './home/home.component';
import {AbsencesManagementComponent} from './absences-management/absences-management.component';
import {AbsenceManagementUpdateComponent} from './absences-management/absence-management-update/absence-management-update.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.route';
import {AbsenceManagementShowComponent} from './absences-management/absence-management-show/absence-management-show.component';

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {LayoutComponent} from './layout/layout.component';
import {UtilisateurGuard} from './guards/utilisateur.guard';
import {PlanningComponent} from './planning/planning.component';
import {ValidationDemandeComponent} from './validation-demande/validation-demande.component';
import {SynthetiqueComponent} from './synthetique/synthetique.component';
import {JoursFeriesComponent} from './jours-feries/jours-feries.component';
import {HttpClientModule} from '@angular/common/http';
import {UtilisateurService} from './services/utilisateur.service';
import {DemandeAbsenceComponent} from './demande-absence/demande-absence.component';
import {CounterComponent} from './counter/counter.component';
import {AbsenceService} from './services/AbsenceService';
import {CreationFerieRttComponent} from './creation-ferie-rtt/creation-ferie-rtt.component';
import {RttService} from './services/rtt.service';
import {FerieService} from './services/ferie.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemandeAbsenceComponent,
    AbsencesManagementComponent,
    AbsenceManagementUpdateComponent,
    AbsenceManagementShowComponent,
    LoginComponent,
    LayoutComponent,
    PlanningComponent,
    ValidationDemandeComponent,
    SynthetiqueComponent,
    JoursFeriesComponent,
    CounterComponent,
    CreationFerieRttComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AbsenceService,
    UtilisateurGuard,
    UtilisateurService,
    FerieService,
    RttService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
