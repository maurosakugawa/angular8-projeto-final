import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { FlexLayoutModule }          from '@angular/flex-layout';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { AngularFireModule }         from '@angular/fire';
import { AngularFireAuthModule, 
         AngularFireAuth }           from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule, Routes }      from '@angular/router';
// Para o template driven 
import { FormsModule, 
ReactiveFormsModule }                from '@angular/forms'; 
// Para o menu
import { MatDialogModule }           from '@angular/material';
import { NgSelectModule }            from '@ng-select/ng-select';
import { NgbModule }                 from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule }              from 'ag-grid-angular';
import { NgxLoadingModule }          from 'ngx-loading';
// Para o angular material
import { MatCardModule}              from '@angular/material/card';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDividerModule,
  MatListModule
}                                    from '@angular/material';
/* Importação de componentes do projeto */
import { AppComponent }              from './app.component';
import { LoginComponent }            from './login/login.component';
import { EnviarComponent }           from './enviar/enviar.component';
import { AppRoutingModule }          from './app-routing.module';
import { NotFoundComponent }         from './not-found/not-found.component';
import { HomeComponent }             from './home/home.component';
import { PerfilComponent }           from './perfil/perfil.component';
import { QuestionarioComponent }     from './questionario/questionario.component';
import { NavbarComponent }           from './navbar/navbar.component';
import { QuestaoComponent }          from './questao/questao.component';
import { QuestaoabertaComponent }    from './questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent }   from './questaofechada/questaofechada.component';
/* Importação de serviços do projeto */
import { LoginService, config }      from './services/login.service';
import { EnviarService }             from './services/enviar.service';
import { ReportService }             from './services/report.service';
import { ListaService }              from './services/lista.service';
import { SessionService }            from './services/session.service';
import { RespostasService } from './services/respostas.service';
import { ResponderComponent } from './responder/responder.component';
import { RespostasComponent } from './respostas/respostas.component';

@NgModule({
  imports:[   
    BrowserModule, 
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    NgxLoadingModule.forRoot({}),
    AngularFireDatabaseModule,    
    AngularFireModule.initializeApp(config), // Inicializa o firebase
    AngularFireAuthModule,
    AppRoutingModule
  ], 
  declarations: [ 
    AppComponent, 
    LoginComponent, 
    NotFoundComponent, 
    HomeComponent, 
    PerfilComponent, 
    QuestionarioComponent, 
    NavbarComponent, 
    QuestaoComponent,
    EnviarComponent, 
    QuestaoabertaComponent, 
    QuestaofechadaComponent, ResponderComponent, RespostasComponent
  ],
  providers: [
    LoginService,
    ReportService,
    ListaService,
    EnviarService,
    SessionService,
    RespostasService,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ EnviarComponent ],
})
export class AppModule { }
