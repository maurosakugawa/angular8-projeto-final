import { Component, OnInit }          from '@angular/core';
import { RouterModule, 
         Routes, 
         Router, 
         ActivatedRoute }             from '@angular/router';
import { MatIconRegistry }            from '@angular/material';
import { Observable, 
         Subscription }               from 'rxjs';
import { map }                        from 'rxjs/operators';
/* Importações de componentes do projeto */
import { Usuario, 
         Questionario }               from '../dados';
/* Importação dos serviços do projeto */
import { EnviarService }              from '../services/enviar.service';
import { LoginService, User }         from '../services/login.service';
import { ListaService }               from '../services/lista.service';
import { ReportService }              from '../services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;
  private sub: Subscription;
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
  private questionario: Questionario;
  private key: string;
  private x: number;
  private url: string;
  private titulo: string;
  private inicio: string;
  private fim: string;
  private questionarios: Observable<any>;
  private usuariokey: string;
  constructor(private service: ListaService, private router:Router, private route: ActivatedRoute, public dialogService:EnviarService) { }
  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
    });
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
    DeletarQuestionario(questionariokey: string){
      var resposta = confirm("Confirma a remoção deste questionário?"); 
     if (resposta == true) {
      console.log("Deletando...");
      console.log("\n usuariokey: " + this.usuariokey +"\n questionariokey: "+ questionariokey );
      this.service.DeleteQuiz(this.usuariokey, questionariokey)
     }
  }
  AdicionarQuestionario(): void {
    this.questionario = null;
    this.key = null;
    this.service.changeContato(this.questionario, this.key);
    this.router.navigate(['questionario']);
  }
  AdicionarQuestao(questionariokey:string): void {
    console.log("Loading... \n questionariokey: "+questionariokey);
    window.localStorage.setItem('questionariokey', questionariokey);
    this.router.navigate(['questao']);
  }
  goto(questionariokey:string):void{
    console.log("usuariokey:" + this.usuariokey +", questionariokey"+ questionariokey );
    this.router.navigate(['/grupo/',this.usuariokey,questionariokey]);
  }
  edit(questionario: Questionario, questionariokey: string){
    this.service.titulo  = 'Atualizar Questionário';
    this.service.addButton  = 'Atualizar';
    this.service.changeContato(questionario, questionariokey, );
  }
  openModal() {
    var data = null;//chama a api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmado
      console.log('Yes');
    }, ()=>{
      //não confirmado
      console.log('No');
    });
  }
    enviar(questionariokey:string) {
    this.x = 1;
    this.url = ("https://ang-projeto-final.stackblitz.io/responder/"+this.usuariokey+"/"+questionariokey);
    window.localStorage.setItem('url',this.url);
    var data = null;
  }
  Responder(questionariokey:string, questionariotitulo:string){
    console.log("Responder questionario: "+questionariokey);
    window.localStorage.setItem('questionariokey', questionariokey);
    window.localStorage.setItem('questionariotitulo',questionariotitulo);
    this.router.navigate(['responder']);
  }
}