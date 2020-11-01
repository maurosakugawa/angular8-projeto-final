import { Component, OnInit }        from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { map }                      from 'rxjs/operators';
import { Subscription }             from 'rxjs';
import { MatIconRegistry }          from '@angular/material';
/* Importação de serviços do projeto */
import { ListaService }              from '../services/lista.service';
import { LoginService, User }       from '../services/login.service';
import { ReportService }            from '../services/report.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: User;
  private sub: Subscription;
  private menu = [
    { caption: 'Sair', mode: 'signOut' }
  ];
  get authenticated() {
    return this.user !== null;
  }
  myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
  todoList;
  constructor(public service: ListaService, private icon: MatIconRegistry,
private report: ReportService, private login: LoginService) { }
  ngOnInit() {
    this.service.getTodoList().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.todoList = customers;
    });
  // Registra as fonte awesome entre os conjuntos de ícones disponíveis para o componente mat-icon
    this.icon.registerFontClassAlias('fontawesome', 'fa');
  // Subscreve no authState observável para saber sobre as alterações de status de login
    this.sub = this.login.authState$.subscribe( user => {
      this.user = user;
    } );
  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertTodo(this.service.form.value);
    }
  }
    ngOnDestroy() {
    this.sub.unsubscribe();
  }  
}