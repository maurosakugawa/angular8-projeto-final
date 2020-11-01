import { Component, 
         OnInit }            from '@angular/core';
import { map }               from 'rxjs/operators';
import { Observable }        from 'rxjs';
import { RouterModule, 
         Routes, 
         Router, 
         ActivatedRoute }    from '@angular/router';
import { MAT_DIALOG_DATA }   from '@angular/material';
import { AngularFireAuth }   from 'angularfire2/auth';
import * as firebase         from 'firebase/app';
/* Importação dos componentes do projeto */
import { Usuario, 
         Questionario, 
         Questao,
         QuestaoAberta,
         QuestaoFechada }    from '../dados';
/* Importação dos serviços do projeto */
import { ListaService }      from '../services/lista.service';
import { EnviarService }     from '../services/enviar.service';

@Component({
  selector: 'app-questaofechada',
  templateUrl: './questaofechada.component.html',
  styleUrls: ['./questaofechada.component.css']
})

export class QuestaofechadaComponent implements OnInit {
  private tituloaberto: string = 'Questão Aberta';
  private titulofechado: string = 'Questao Fechada';
  private addButton: string = 'Adicionar';
  private enunciado: string;
  private respostas: string;
  private alternativaA: string;
  private alternativaB: string;
  private alternativaC: string;
  private alternativaD: string;
  private alternativacorreta: string;
  private questionarios: Observable<any>;
  private questoes: Observable<any>;
  private usuariokey: string;
  private questaofechada: QuestaoFechada;
  private questionariokey: string = '';
  private questaokey: string = '';
  constructor(private service: ListaService, private router:Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
      this.questoes = this.service.getAllQuestao(this.usuariokey, window.localStorage.getItem('questionariokey'));
    });
    this.questaofechada = new QuestaoFechada();
    this.questaokey = '';
    this.service.currentContatoQuestion.subscribe(data => {
      if (data.questao && data.questaokey) {
        this.questaofechada.enunciado = data.questao.enunciado;
        this.questaokey = data.questaokey;
        this.questaofechada.enunciado = data.questao.enunciado;
        this.questaofechada.alternativaA = data.questao.alternativaA;
        this.questaofechada.alternativaB = data.questao.alternativaB;
        this.questaofechada.alternativaC = data.questao.alternativaC;
        this.questaofechada.alternativaD = data.questao.alternativaD;
        this.questaofechada.alternativacorreta = data.questao.alternativacorreta;
       }
    })
    this.titulofechado = window.localStorage.getItem('titulofechado');
    this.addButton  = window.localStorage.getItem('addButton');
  }
  salvarQuestaoFechada(){
      if (this.questaokey){
        console.log("Atualizar");
        this.service.editarQuestao(this.usuariokey, this.questaofechada, window.localStorage.getItem('questionariokey'), this.questaokey);
        this.addButton = 'Adicionar';
        this.titulofechado = 'Questão Aberta';
        window.localStorage.setItem('addButton', this.addButton);
        window.localStorage.setItem('tituloaberto', this.tituloaberto);
     } else {
        console.log("Cadastrar"+ this.questoes);
        this.service.addQuestion(this.questaofechada, this.usuariokey,window.localStorage.getItem('questionariokey'));
    }
    this.questaofechada = new QuestaoFechada();
    this.questaokey = '';
  }
    Voltar(){
    this.router.navigate(['home']);
  }
  todoList;
}