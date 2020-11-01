import { Component, Inject, OnInit }  from '@angular/core';
import { MAT_DIALOG_DATA }            from '@angular/material';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css']
})
export class EnviarComponent{    
    private url: string;
    private usuarionome: string;
    private questoes;
    ngOnInit() {
      this.url = window.localStorage.getItem('url');
      this.usuarionome = window.localStorage.getItem('usuarionome');
    }; 
     ngOnDestroy() {
    }
}