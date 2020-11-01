import { Component, 
         OnInit }            from '@angular/core';
import { map }               from 'rxjs/operators';
import { Observable }        from 'rxjs';
import { RouterModule, 
         Routes, 
         Router, 
         ActivatedRoute }    from '@angular/router';
import { AngularFireAuth }   from 'angularfire2/auth';
import * as firebase         from 'firebase/app';
import { MAT_DIALOG_DATA }   from '@angular/material';
/* Importação dos componentes do projeto */
import { QuestaoabertaComponent } from '../questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent } from '../questaofechada/questaofechada.component';
import { Usuario, 
         Questionario, 
         Questao,
         QuestaoAberta,
         QuestaoFechada }    from '../dados';
/* Importação dos serviços do projeto */
import { ListaService }      from '../services/lista.service';
import { EnviarService }     from '../services/enviar.service';


@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})

export class QuestaoComponent implements OnInit {

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
  private questaoaberta: QuestaoAberta;
  private questaofechada: QuestaoFechada;
  private questionariokey: string = '';
  private questaokey: string = '';
  private x: number;

  constructor(private service: ListaService, private router:Router, private route: ActivatedRoute, public dialogService:EnviarService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
      this.questoes = this.service.getAllQuestao(this.usuariokey, window.localStorage.getItem('questionariokey'));
    });
    this.questaoaberta = new QuestaoAberta();
    this.questaofechada = new QuestaoFechada();
    this.questaokey = '';
    this.service.currentContatoQuestion.subscribe(data => {
      if (data.questao && data.questaokey) {
        this.questaoaberta.enunciado = data.questao.enunciado;
        this.questaokey = data.questaokey;
        this.questaofechada.enunciado = data.questao.enunciado;
        this.questaofechada.alternativaA = data.questao.alternativaA;
        this.questaofechada.alternativaB = data.questao.alternativaB;
        this.questaofechada.alternativaC = data.questao.alternativaC;
        this.questaofechada.alternativaD = data.questao.alternativaD;
        this.questaofechada.alternativacorreta = data.questao.alternativacorreta;
       }
    })
  }

  DeletarQuestao(questaoabertakey: string){
    var resposta = confirm("Tem certeza que deseja remover esta questão?");
    if (resposta == true) {
      console.log("Deletando...");
      console.log("\n Usuario Key: " + this.usuariokey + 
                  "\n Questionario Key: " + window.localStorage.getItem('questionariokey') + 
                  "\n Questao Key: "+ questaoabertakey);
      this.service.DeleteQuestion(this.usuariokey, window.localStorage.getItem('questionariokey'), questaoabertakey)
    }   
  }

  edit(questionario: Questionario, questaokey: string, questao){
    if(questao==null){
      this.x = 3;
      this.addButton = 'Atualizar';
      this.tituloaberto = 'Atualizar questão aberta'
      window.localStorage.setItem('addButton', this.addButton);
      window.localStorage.setItem('tituloaberto', this.tituloaberto);
    }else{
      this.x = 4;
      this.addButton = 'Atualizar';
      this.titulofechado = 'Atualizar questão fechada'
      window.localStorage.setItem('addButton', this.addButton);
      window.localStorage.setItem('titulofechado', this.titulofechado);
    }
    this.service.SourceQuestion(questionario, window.localStorage.getItem('questionariokey'), questaokey);
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  CadastrarQuestoesAberta(){
    this.addButton = 'Adicionar';
    this.tituloaberto = 'Questão Aberta'
    window.localStorage.setItem('addButton', this.addButton);
    window.localStorage.setItem('tituloaberto', this.tituloaberto);
    this.x = 3;
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

   CadastrarQuestoesFechada(){
    this.addButton = 'Adicionar';
    this.titulofechado = 'Questão Fechada'
    window.localStorage.setItem('addButton', this.addButton);
    window.localStorage.setItem('titulofechado', this.titulofechado);
    this.x = 4;
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }
}

/*
@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {
  /* Títulos para a view  e o botão da Grade de questões *//*
  titulo: string = 'Cadastre as questões!';
  addButton: string = 'Adicionar';
  /* Declaração de variáveis *//*
  private enunciado: string;
  private respostas: string;
  private questionarios: Observable<any>;
  private questionarioAtual: Observable<any>;
  private questao: Observable<any>;
  private usuariokey: string;
  questaoaberta: QuestaoAberta;
  questionariokey: string = '';
  questaokey: string = '';
  constructor(private service: ListaService, private router:Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
      this.questao = this.service.getAllQuestao(this.usuariokey, window.localStorage.getItem('questionariokey'));
    });
    this.questaoaberta = new QuestaoAberta();
    this.questaokey = '';
    this.service.currentContatoQuestion.subscribe(data => {
       if (data.questaoaberta && data.questaokey) {
        this.questaoaberta.enunciado = data.questaoaberta.enunciado;
        this.questaokey = data.questaokey;
       }
    })
    this.questaoaberta = new QuestaoAberta();
  }
  size(obj) {
    return obj ? Object.keys(obj).length : 0;
  }
  toData(data):number {
    let temp = data.split('/');
    return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0])).getTime();
  }
  formatDate(timestamp):string{
    let d = new Date(timestamp);
    return (d.getDate() < 10? "0"+d.getDate() : d.getDate())  +"/"+
          (d.getMonth() < 9? "0"+(d.getMonth()+1) : d.getMonth()+1)  +"/"+
          d.getFullYear();
  }
  salvarQuestao() {
    if (this.questaokey){
      console.log("Atualizar");
      this.service.editarQuestao(this.usuariokey, this.questaoaberta, window.localStorage.getItem('questionariokey'), this.questaokey);
    } else {
      console.log("Cadastrar"+ this.questao);
      this.service.addQuestion(this.questaoaberta, this.usuariokey,window.localStorage.getItem('questionariokey'));
    }
    this.questaoaberta = new QuestaoAberta();
    this.questaokey = '';
    this.titulo = 'Cadastre as questões!';
    this.addButton  = 'Adicionar Questão';
  }
  goto(questionariokey:string):void{
    console.log("usuariokey:" + this.usuariokey +", questionariokey"+ questionariokey );
    this.router.navigate(['/grupo/',this.usuariokey,questionariokey]);
  }
  DeletarQuestao(questaoabertakey: string){
    var resposta = confirm("Confirma a remoção da questão?");
    if (resposta == true) {
      console.log("Deletando...");
      console.log("\n Usuario Key: " + this.usuariokey + 
                  "\n Questionario Key: " + window.localStorage.getItem('questionariokey') + 
                  "\n Questao Key: "+ questaoabertakey);
      this.service.DeleteQuestion(this.usuariokey, window.localStorage.getItem('questionariokey'), questaoabertakey)
    }   
  }
  edit(questionario: Questionario, questaokey: string){
    this.titulo = 'Atualizar Questão';
    this.addButton  = 'Atualizar';
    this.service.SourceQuestion(questionario, window.localStorage.getItem('questionariokey'), questaokey);
  }
}

*/