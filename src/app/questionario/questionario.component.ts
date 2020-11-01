import { Component, 
         OnInit }         from '@angular/core';
import { map }            from 'rxjs/operators';
import { RouterModule, 
         Routes, 
         Router, 
         ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs';
/* Importação dos componentes do projeto */
import { Usuario, 
         Questionario }   from '../dados';
/* Importação dos serviços do projeto */
import { ListaService }    from '../services/lista.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})

export class QuestionarioComponent implements OnInit {
  private titulo: string;
  private inicio: string;
  private fim: string;  
  private questionarios: Observable<any>;
  private usuariokey: string;
  questionario: Questionario;
  key: string = '';  
  constructor(private service: ListaService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
    });    
    this.questionario = new Questionario();
    this.service.currentContato.subscribe(data => {
      if (data.questionario && data.key) {
        this.questionario = new Questionario();
        this.questionario.titulo = data.questionario.titulo;
        this.questionario.inicio = data.questionario.inicio;
        this.questionario.fim = data.questionario.fim;
        this.key = data.key;
      }
    })
  }
  size(obj) {
    return obj ? Object.keys(obj).length : 0;
  }
  toData(data):number {
    let temp = data.split('/');
    return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0])).getTime();
  }
  formatDate(timestamp):any{
    let d = new Date(timestamp);
    return (d.getDate() < 10? "0"+d.getDate() : d.getDate())  +"/"+
          (d.getMonth() < 9? "0"+(d.getMonth()+1) : d.getMonth()+1)  +"/"+
          d.getFullYear();
  }  
  salvarQuestionario() {
    if (this.key) { 
      console.log("Atualizar");
      console.log("Questionario Key: " + this.key);
      this.service.editarQuestionario(this.usuariokey, this.questionario, this.key);
      alert("Questionário atualizad0!");
    } else {
      console.log("Cadastrar");
      console.log("Questionario Key: " + this.key);
      this.service.addQuestionario(this.questionario, this.usuariokey);
      alert("Questionário cadastrado!");
    }
    this.router.navigate(['home']);
    this.service.addButton  = 'Adicionar';
  }
  goto(questionariokey:string):void{
    console.log("usuariokey:" + this.usuariokey +", questionariokey"+ questionariokey );
    this.router.navigate(['/grupo/',this.usuariokey,questionariokey]);
  }
  DeletarQuestao(questionariokey: string){
    console.log("Deletando...");
    console.log("\n usuariokey: " + this.usuariokey +"\n questionariokey: "+ questionariokey );
    this.service.DeleteQuiz(this.usuariokey, questionariokey)
  }
  Voltar(){
    this.service.titulo = 'Cadastrar Questionário';
    this.service.addButton  = 'Adicionar';
    this.router.navigate(['home']);
  }
  todoList;
}