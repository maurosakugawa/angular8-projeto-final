import { Injectable }                 from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
/* Importação dos componentes do projeto. */
import { EnviarComponent }            from '../enviar/enviar.component';
import { QuestionarioComponent }      from '../questionario/questionario.component';
import { QuestaoabertaComponent }     from '../questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent }    from '../questaofechada/questaofechada.component';

@Injectable()
export class EnviarService {

  private x:number;

  constructor(public dialog: MatDialog) { }

  openModal(title:string, message:string, yes:Function = null, no:Function = null, x:number) {
    this.x = x;
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: title,
        message:message
    };
    dialogConfig.minWidth = 350;

    if(this.x == 1){
    const dialogRef = this.dialog.open(EnviarComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      }else{
        if(no){
          no();
        }
      } 
    });
    }
    if(this.x == 2){
      const dialogRef = this.dialog.open(QuestionarioComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      }else{
        if(no){
          no();
        }
      }   
    });
    }
    else if(this.x == 3){
      const dialogRef = this.dialog.open(QuestaoabertaComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      }else{
        if(no){
          no();
        }
      }   
    });
    }
    else if(this.x == 4){
      const dialogRef = this.dialog.open(QuestaofechadaComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(yes){
          yes();
        }
      }else{
        if(no){
          no();
        }
      }   
    });
    }
  }
}