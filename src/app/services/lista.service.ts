import { Injectable }         from '@angular/core';
import { FormGroup, 
         FormControl, 
         Validators }         from '@angular/forms';
import { AngularFireDatabase, 
         AngularFireList }    from 'angularfire2/database';
import { BehaviorSubject }    from 'rxjs';
import { map }                from 'rxjs/operators';
import { Router, 
         ActivatedRoute }     from '@angular/router';
/* Importação dos componentes do projeto */
import { Usuario, 
         Questionario, 
         Grupo, 
         Questao, 
         QuestaoAberta, 
         Alternativa }        from '../dados';

@Injectable()
export class ListaService {
addButton: string = 'Adicionar';
titulo: string = 'Cadastrar Questionário';
constructor(private firebase: AngularFireDatabase, private router: Router) { }
// Inserir Questionario (INSERT)
  addQuestionario(q: Questionario, usuariokey: string): void {
    console.log(q);
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
// Inserir Questão (INSERT)
    addQuestion(q: QuestaoAberta, usuariokey: string, questaokey): void {
    console.log(q);
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questaokey}/Questoes`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  //Deletar Questionario (DELETE)
  DeleteQuiz(usuariokey:string, questionariokey) {
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`).remove(questionariokey); 
  }
  //Deletar Questao (DELETE)
   DeleteQuestion(usuariokey:string, questionariokey, questaokey) {
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`).remove(questaokey); 
  }
// Ler todos os Questionarios de um deterteminado usuario (READ)
  getAllQuestionario(usuariokey:string) {
    return this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`,
      ref => ref.orderByChild('prj/usuarios/questionarios/titulo')
    )      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* todas as demais propriedades do objeto JSON no database */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
// Ler todas as questoes de um determinado questionario (READ)
    getAllQuestao(usuariokey:string, questionariokey:string) {
    return this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`,
      ref => ref.orderByChild('prj/usuarios/questionarios/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* todas as demais propriedades do objeto JSON no database */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
    } /* Para editar o QUESTIONARIO */
  private contatoSource = new BehaviorSubject({questionario: null, key: '' });
  currentContato = this.contatoSource.asObservable(); 
  changeContato(questionario: Questionario, key: string) {
    this.contatoSource.next({ questionario: questionario, key: key });
  }
    //Editar Questionario (UPDATE)
  editarQuestionario(usuariokey:string, questionario: Questionario, key: string){
      this.firebase.list(`prj/usuarios/${usuariokey}/questionarios`).update(key, questionario)
      .catch((error: any) => {
        console.error(error);
      });
  }
   /* Para editar as questões */
  private contatoSourceQuestion = new BehaviorSubject({questaoaberta: null, questionariokey: '', questaokey: '' });
  currentContatoQuestion = this.contatoSourceQuestion.asObservable(); 
  SourceQuestion(questaoaberta: Questionario, questionariokey: string, questaokey: string) {
    this.contatoSourceQuestion.next({ questaoaberta: questaoaberta, questionariokey: questionariokey, questaokey: questaokey });
  }
    //Editar Questao (UPDATE)
  editarQuestao(usuariokey:string, questionario: Questionario, questionariokey: string, key: string){
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`).update(key, questionario)
      .catch((error: any) => {
        console.error(error);
      });
  }  
  getAllGrupo(usuariokey:string, questionariokey:string) {
    return this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/grupos`,
      ref => ref.orderByChild('prj/usuarios/questionarios/grupos/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* todas as demais propriedades do objeto JSON no database */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  // Inserir Resposta (INSERT)
    addRespostas(q: QuestaoAberta, questionariokey): void {
    console.log(q);
    this.firebase.list(`prj/respostas/questionarios/${questionariokey}/Questoes`).push(q)
      .then((result: any) => {
        console.log(result.key);
        this.router.navigate(['home']);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  todoList: AngularFireList<any>;
  form: FormGroup = new FormGroup({
    key: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  getTodoList() {
    this.todoList = this.firebase.list('todolist');
    return this.todoList.snapshotChanges();
  }  
  insertTodo(todo) {
    if (todo.key == '') {
      this.todoList.push(todo);
    } else {
      this.todoList.update(todo.key, {
        title: todo.title,
        description: todo.description,
      });
    }
    this.resetForm();
  }  
  editTodoList(todo: any) {
    todo
    this.form.patchValue(todo);
    this.addButton = 'Atualizar';
  }
  deleteTodoList($key: string) {
    this.todoList.remove($key);
  }  
  resetForm() {
    this.addButton = 'Adicionar';
    this.form.reset();
  }
}