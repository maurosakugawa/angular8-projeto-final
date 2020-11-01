import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry }              from '@angular/material';
import { Subscription }                 from 'rxjs';
/* Importações de serviços do prpojeto */
import { LoginService, User }           from './services/login.service';
import { ReportService }                from './services/report.service';
import { SessionService }               from './services/session.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { 'class': 'mat-typography' }
})
export class AppComponent implements OnInit, OnDestroy { 
  private user: User;
  private sub: Subscription;
  private uid: any;
  isCollapsed = true
  title = 'Menu'; // Título do navibar (menu)
  private menu = [ /* Opções rotas do navbar */
    { caption: 'Verificar email', mode: 'verifyEmail' },
    { caption: 'Mudar email', mode: 'changeEmail' },
    { caption: 'Mudar password', mode: 'changePassword' },
    { caption: 'Excluir conta', mode: 'delete' },
    { caption: 'Sair', mode: 'signOut' },
  ];
  get authenticated() {
    return this.user !== null;
  }
  get messages(): string[] {
    return this.report.messages;
  }
  constructor(public sessionSvc: SessionService,
              private icon: MatIconRegistry,
              private report: ReportService,
              private login: LoginService) {
  let mainMenu = [ /* Opções de rotas do menu */
    { id: 'login', title: 'Login', path: '/login', isActive: true },
    { id: 'enviar', title: 'Enviar', path: '/enviar' },
    { id: 'questionário', title: 'Questionário', path: '/questionario' }, 
    { id: 'grade', title: 'Grade de questionários', path: '/home' },    
    { id: 'questao', title: 'Grade de questões', path: '/questao' },
    { id: 'questaoaberta', title: 'Questão Aberta', path: '/questaoaberta' },
    { id: 'questaofechada', title: 'Questão Fechada', path: '/questaofechada' }
  ]
    this.sessionSvc.setMenu('main', mainMenu)
  }
  ngOnInit() {
    /* Registra as fontes awesome entre os conjuntos 
    *  disponíveis de ícones para o componente mat-icon */
    this.icon.registerFontClassAlias('fontawesome', 'fa');
    /* Subscreve no authState observável para saber sobre 
    *  as alterações de status de login */
    this.sub = this.login.authState$.subscribe( user => {
      this.user = user;
      if (user != null) {
      this.uid = user.uid;
      window.localStorage.setItem('uid', this.uid);
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}