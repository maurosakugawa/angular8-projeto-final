import { Component, OnInit } from '@angular/core';
import { RespostasService } from '../services/respostas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css']
})
export class RespostasComponent implements OnInit {

  private pessoas: Observable<any>;
  private questionarios: Observable<any>;
  private respostas: Observable<any>;
  private pessoakey: string;
  private questionariokey: string;
  private liberar_quiz: boolean = false;
  private liberar_pessoas: boolean = true;
  private liberar_respostas: boolean = false;
  private liberar_links: boolean = false;
  private usuariokey: string;

  constructor(private service: RespostasService) { }

  ngOnInit() {
    this.usuariokey =  window.localStorage.getItem('uid');
    this.pessoas = this.service.getAllPessoas(this.usuariokey);
  }

  getQuestionario(pessoa){
    this.pessoakey = pessoa;
    this.liberar_pessoas = false;
    this.liberar_quiz = true;
    this.liberar_links = true;
    this.questionarios = this.service.getAllQuestionarios(pessoa, this.usuariokey);
  }

  getRespostas(questionario){
    this.respostas = null;
    this.liberar_quiz = false;
    this.liberar_respostas = true;
    this.questionariokey = questionario;
    this.respostas = this.service.getAllRespostas(this.pessoakey, this.questionariokey, this.usuariokey);
  }

  get Respostas() {
    return  this.liberar_respostas;
  }

  get Questionarios() {
    return  this.liberar_quiz;
  }

  get Pessoas() {
    return  this.liberar_pessoas;
  }

  get Links() {
    return  this.liberar_links;
  }

  chamarpessoas(){
    this.liberar_respostas = false;
    this.liberar_quiz = false;
    this.liberar_links = false;
    this.liberar_pessoas = true;
  }

  chamarQuestionario(){
    this.liberar_pessoas = false;
    this.liberar_respostas = false;
    this.liberar_quiz = true;
  }

}