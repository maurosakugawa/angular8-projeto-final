import { Component, OnInit }      from '@angular/core';
import { Router, 
         ActivatedRoute, 
         ParamMap }               from '@angular/router';
import { FormGroup, 
         FormControl, 
         Validators }             from '@angular/forms';
/* Importações de $ do projeto */
import { $loginAnimations }       from './login-animations';
import { $authProviders }         from './providers';
/* Importação de serviços do projeto */
import { ReportService }          from '../services/report.service';
import { LoginService }           from '../services/login.service';

export type pageTypes = 'registrar' | 'signIn' | 'forgotPassword' | 'resetPassword' | 'changePassword' | 'changeEmail' | 'delete';

let $msgs = {
  registrar: {// Página para registro de novo usuário
    title: 'Registrar',
    caption: 'Cadastre-se com meu email' 
  }, 
  signIn: { // Página de login de usuário registrado
    title: 'Entre com sua conta!',
    caption: 'Entre com meu email' 
  },
  forgotPassword: {// Leva à página de redefinição de senha
    title: 'Alterar Senha',
    caption: 'Alterar Senha' 
  },
  resetPassword: {/* Redefinir para uma nova página de senha 
                  *  (2º passo depois de forgotPassword) */
    title: 'Nova Senha',
    caption: 'Mude a senha' 
  },
  changeEmail: {// Mudar o email 
    title: 'Mude o e-mail',
    caption: 'Atualize o email' 
  },
  changePassword: {// Mudar a senha (enquanto autenticado)
    title: 'Mudar senha',
    caption: 'Atualize a senha' 
  },
  delete: {// Deletar a conta de usuário
    title: 'Deletar conta',
    caption: 'Excluir a conta' 
  }
};

@Component({
  selector : 'wm-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css'],
  animations: $loginAnimations
})
export class LoginComponent implements OnInit {
  private page: pageTypes;
  private code: string;
  private msgs = $msgs;
  private form: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password: FormControl;
  private newEmail: FormControl;
  private newPassword: FormControl; 
  private providers = $authProviders;
  private hide = true;
  private error = null;
  private progress = false;  
  constructor(private login: LoginService,
              private report: ReportService,
              private route : ActivatedRoute,
              private router: Router) {
    this.name = new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, Validators.required);
    this.newEmail = new FormControl(null, [Validators.required, Validators.email]);
    this.newPassword = new FormControl(null, Validators.required);
    this.form = new FormGroup({});
    this.switchPage('signIn');
  }
  ngOnInit() {
/* Discriminar entre a opção de login usando os parâmetros de consulta */
    this.route.queryParamMap.subscribe( (params: ParamMap) => {
      let mode  = params.get('mode') || 'signIn';
      this.code = params.get('oobCode');
      console.log('login mode: ', mode);
      switch(mode) {
        case 'signOut':
        this.signOut();
        break;
        case 'verifyEmail':
        this.verifyEmail( this.code );
        break;
        default:
        this.switchPage(mode as pageTypes);
      }
    });
  }
  private switchPage(page: pageTypes) {
    // Remove todos os controles do grupo de formulários
    Object.keys(this.form.controls).forEach( control => {
      this.form.removeControl(control);
    });    
  /*  Adicione os controles relevantes ao formulário 
  *   de acordo com a página selecionada  */
    switch(this.page = page) {
      case 'registrar':
      this.form.addControl('name', this.name);
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);
      break;
      default:
      case 'signIn':
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);      
      break;
      case 'forgotPassword':
      this.form.addControl('email', this.email);
      break;
      case 'resetPassword':
      this.form.addControl('newPassword', this.newPassword);
      break;
      case 'changePassword':
      this.form.addControl('password', this.password);
      this.form.addControl('newPassword', this.newPassword);
      break;
      case 'changeEmail':
      this.form.addControl('password', this.password);
      this.form.addControl('newEmail', this.newEmail);
      break;
      case 'delete':
      this.form.addControl('password', this.password);      
      break;
    }
  }
  private showError(error: string) {
    this.error = error;
    this.progress = false;
    setTimeout(() => this.error = null, 5000);
  }
  private reportSuccess(message: string, jumpTo?: string) {    
    this.progress = false;
    this.report.add(message);
    if(jumpTo) {      
      this.router.navigate(['.'], { 
        relativeTo: this.route,
        queryParams: {
          mode: jumpTo
        } 
      });
    }
  }
  private loginAction() {    
    switch(this.page) {
      default:
      case 'signIn':
      this.signIn( this.email.value, 
                   this.password.value );
      break;
      case 'registrar':
      this.registerNew( this.email.value, 
                        this.password.value, 
                        this.name.value );
                        alert('Conta criada com sucesso!');
                        this.router.navigate(['home']);
      break;
      case 'forgotPassword':
      this.forgotPassword( this.email.value );
      break;
      case 'resetPassword':
      this.resetPassword(this.code, this.newPassword.value );
      break;
      case 'changePassword':
      this.updatePassword( this.password.value,
                           this.newPassword.value );
                           this.router.navigate(['perfil']);
                           alert('Senha alterada com sucesso!');
      break;
      case 'changeEmail':
      this.updateEmail( this.password.value,
                        this.newEmail.value );
                        this.router.navigate(['perfil']);
                        alert('Email alterado com sucesso!');
      break;
      case 'delete':
      this.deleteAccount( this.password.value );
      alert('Conta excluida com sucesso!');
      this.router.navigate(['login']);
      break;
    }
  }
  // Login pelo Facebook e Google
  private signInWith(provider: string) { 
    this.progress = true;  
    this.login.signInWith( provider )
      .then( () => this.reportSuccess('Conectado usando ' + provider ) )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
      this.router.navigate(['home']) 
  }
  // Login pelo Email
  private signIn(email: string, password: string) {    
    this.progress = true;
    // Login usando email/senha
    this.login.signIn(email, password)
      .then( () => this.reportSuccess('Assinado como ' + email + this.router.navigate(['home'])) )
      .catch( error => {
      // Mostra o código de error em caso de falha
      this.showError(error.code);
    });
  }
  private registerNew(email: string, password: string,name: string) {
    this.progress = true;
    // Registrando um novo usuário com email/senha
    this.login.registerNew(email, password, name )
      .then( () => this.reportSuccess('Registrado como ' + email) )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      });
  }
  private verifyEmail(code?: string) {    
    this.progress = true;
    /* Quando um email é especificado, 
    *  tratamos a solicitação como uma tantativa de login */
    if(code) {
      this.login.verifyEmail(code)
        .then( () => this.reportSuccess('Email verificado!') )
        .catch( error => {
          // Mostra o código de error em caso de falha
          this.showError(error.code);
        });
    }
    else { /* Caso contrário, tratamos a solicitação para 
           *  enviar um email de verificação */

      this.login.sendEmailVerification()
      .then( () => this.reportSuccess('Confirmação de email enviada!') )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      });
    }
  }
  private forgotPassword(email: string) {   
    this.progress = true;
    this.login.forgotPassword(email)
      .then( () => this.reportSuccess('Rdefinir a senha para ' + email) )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
  private resetPassword(code: string, newPassword: string) {
    this.progress = true;
    this.login.resetPassword(code, newPassword)
      .then( () => this.reportSuccess('Redefinir para uma nova senha', 'signIn') )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
  private updateEmail(password: string, newEmail: string) {
    this.progress = true;   
    this.login.updateEmail(password, newEmail)
      .then( () => this.reportSuccess('E-mail atualizado para ' + newEmail) )
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
  private updatePassword(password: string, newPassword: string) {
    this.progress = true;
    this.login.updatePassword(password, newPassword)
      .then( () => this.reportSuccess('Senha atualizada!') )
      .catch( error => {
       // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
  private deleteAccount(password: string) {
    this.progress = true;  
    this.login.deleteUser(password)
      .then( () => {
        this.reportSuccess('Conta excluída!', 'signIn');
      })
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
  private signOut() {
    this.progress = true;
    this.login.signOut()
      .then( () => {
        this.reportSuccess('Signed out', 'signIn');
      })
      .catch( error => {
        // Mostra o código de error em caso de falha
        this.showError(error.code);
      })
  }
}  