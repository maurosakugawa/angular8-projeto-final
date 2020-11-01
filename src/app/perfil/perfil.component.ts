import { Component, 
         OnInit, 
         OnDestroy,
         NgModule }                 from '@angular/core';
import { MatIconRegistry }          from '@angular/material';
import { RouterModule, Routes }     from '@angular/router';
import { Subscription }             from 'rxjs';
/* Importação de componentes do projeto */
import { LoginComponent }           from '../login/login.component';
/* Importações de serviços do projeto */
import { LoginService, User }       from '../services/login.service';
import { ReportService }            from '../services/report.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  private user: User;
  private sub: Subscription;
  private menu = [
    { caption: 'Verificar Email', mode: 'verifyEmail' },
    { caption: 'Trocar Email', mode: 'changeEmail' },
    { caption: 'Trocar Senha', mode: 'changePassword' },
    { caption: 'Deletar conta', mode: 'delete' },
    { caption: 'Sair', mode: 'signOut' },
  ];
  get authenticated() {
    return this.user !== null;
  }
  get messages(): string[] {
    return this.report.messages;
  }
  constructor(private icon: MatIconRegistry,
              private report: ReportService,
              private login: LoginService) {}
  ngOnInit() {  /* Registra as fontes awesome entre os conjuntos 
                *  de ícones disponíveis para o componente mat-icon  */  
    this.icon.registerFontClassAlias('fontawesome', 'fa');
  /* Subscreve no authState observável para saber sobre as 
  *  alterações de status de login  */    
    this.sub = this.login.authState$.subscribe( user => {
      this.user = user;      
    } );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}