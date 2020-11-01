export class Usuario {
  usuario: string;
  questionarios: Questionario[];
}

export class Questionario {
  titulo: string;
  inicio: number; //firebase.firestore.Timestamp;
  fim: number; //firebase.firestore.Timestamp;
  grupos: Grupo[];
}

export class Grupo {
  titulo: string;
  fechadas: Questao[];
  abertas: QuestaoAberta[];
}

export class Questao {
  enunciado: string;
  alternativas: Alternativa[];
  ismult: boolean;
}

export class QuestaoAberta {
  enunciado: string;
  resposta: string;
}

export class QuestaoFechada {
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  alternativacorreta: string;
  resposta: string;
}

export class Alternativa {
  texto: string;
  contador: number = 0;
}

export class Botao {
   private upButton: string = 'Atualizar'; 
}