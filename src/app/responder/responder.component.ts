import { Component } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario, Questionario, QuestaoAberta } from '../dados';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent {

  public questoes: Observable<any>;
  public usuariokey: string;
  public questionariokey: string; 
  private questaoaberta: QuestaoAberta;
  private questaokey: string = '';
  private liberar_quiz: boolean = false;
  private bloqueas_header: boolean = true;
  private id: number = 0;
  private pessoa: string;
  private resposta: string;

  constructor(private service: ListaService, private router:Router, private route: ActivatedRoute) { }

    ngOnInit() {
      //Pega os parametros da rota (URL) e coloca em variaveis
      this.route.params.subscribe(params => {
        this.questionariokey = params['questionario.key'];
        this.usuariokey = params['usuariokey'];
        this.questoes = this.service.getAllQuestao(this.usuariokey, this.questionariokey);
      });
      this.questaoaberta = new QuestaoAberta();
      this.service.currentContatoQuestion.subscribe(data => {
        if (data.questao && data.questaokey) {
          this.questaoaberta = data.questao.enunciado;
        }
      })
    }

  get Header() {
    return  this.bloqueas_header;
  }

  get Quiz() {
    return  this.liberar_quiz;
  }

  iniciar(){
    var resposta = confirm("Tem certeza que deseja iniciar o Questionário?");
    if (resposta == true) {
      this.liberar_quiz = true;
      this.bloqueas_header = false
    }
  }

  ProximaQuestao(questaoaberta: QuestaoAberta){
    this.id = this.id + 1;
    this.service.addRespostas(questaoaberta, this.questionariokey, this.pessoa, this.usuariokey);
  }
}
