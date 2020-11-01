import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable()
export class RespostasService {

  constructor(private firebase: AngularFireDatabase) { }

  // Ler todos os Destinatarios/pessoas que responderam dos questiomnarios(READ)
  getAllPessoas(usuariokey) {
    return this.firebase.list(`prj/${usuariokey}/respostas/Pessoas/`,
      ref => ref.orderByChild('prj')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  getAllQuestionarios(pessoa, usuariokey) {
    return this.firebase.list(`prj/${usuariokey}/respostas/Pessoas/${pessoa}/questionarios/`,
      ref => ref.orderByChild('prj')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  getAllRespostas(pessoa, questionario, usuariokey) {
    return this.firebase.list(`prj/${usuariokey}/respostas/Pessoas/${pessoa}/questionarios/${questionario}/Questoes`,
      ref => ref.orderByChild('prj')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

}