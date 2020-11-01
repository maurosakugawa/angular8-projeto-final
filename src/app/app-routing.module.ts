import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
/* Importações de componentes do projeto */
import { LoginComponent }        from './login/login.component';
import { NotFoundComponent }     from './not-found/not-found.component';
import { HomeComponent }         from './home/home.component';
import { QuestionarioComponent } 
         from './questionario/questionario.component';
import { EnviarComponent }       from './enviar/enviar.component';
import { PerfilComponent }       from './perfil/perfil.component';
import { QuestaoComponent }      from './questao/questao.component';
import { QuestaoabertaComponent }      from './questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent }      from './questaofechada/questaofechada.component';

const routes: Routes = [ // Define rotas de navegação
  // Página Global NotFound usando o conteúdo do idioma padrão
  { path: 'not-found', component: NotFoundComponent },  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'enviar', component: EnviarComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questionario/:usuariokey', component: QuestionarioComponent},
  { path: 'questaoaberta', component: QuestaoabertaComponent },
  { path: 'questaofechada', component: QuestaofechadaComponent },
  { path: 'questao', component: QuestaoComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}