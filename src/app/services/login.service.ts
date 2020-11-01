import { Injectable, OnDestroy }      from '@angular/core';
import { AngularFireAuth }            from 'angularfire2/auth';
import { auth, User }                 from 'firebase';
import { Observable, Subscription }   from 'rxjs';
export { User }                       from 'firebase';

// Firebase configuration for wizdm experiments
export const config = {
    apiKey: "AIzaSyBBYUNqZGkMsVz5zZ6NsZBqItH_OFRs5l8",
    authDomain: "projeto-final-3f3aa.firebaseapp.com",
    databaseURL: "https://projeto-final-3f3aa.firebaseio.com",
    projectId: "projeto-final-3f3aa",
    storageBucket: "projeto-final-3f3aa.appspot.com",
    messagingSenderId: "740405334455",
    appId: "1:740405334455:web:09b754ffbb76c99e"
};

@Injectable()
export class LoginService implements OnDestroy {
  public authState: User = null;
  private sub: Subscription;  
  get authState$(): Observable<User|null> {
    return this.afAuth.user;
  }  
  constructor(public  afAuth: AngularFireAuth) {    
  /* Mantém um instantâneo (snapshot) do estado de 
  * autenticação do usuário atual */
    this.sub = this.authState$.subscribe((auth) => {
      this.authState = auth;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
  /* Retorna verdadeiro se o usuário estiver logado e os dados 
  *  do perfil estiverem disponíveis  */
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get userId(): string {
    return this.authenticated ? 
      this.authState.uid : null;
  }
  public registerNew(email: string, password: string, name: string = ""): Promise<boolean> {    
    console.log("Registering a new user: " + email);    
    /* Cria um novo usuário com email e senha */
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( credential => {    
        /* Atualiza as informações do usuário com as credenciais fornecidas */
        return credential.user.updateProfile({ displayName: name } as User)
          .then ( () => credential !== null);
      });
  }
  public sendEmailVerification(): Promise<void> {
    return this.authenticated ? 
      this.authState.sendEmailVerification() : null;
  }
  public verifyEmail(code: string): Promise<void> {
    return this.afAuth.auth.applyActionCode(code);
  }
  public updateEmail(password: string, newEmail: string): Promise<void> {   
    let email = this.authState.email;
    console.log("Updating user email for: ", email);
    /* Obtém credenciais novas para o usuário atual */
    let credential = auth.EmailAuthProvider.credential(email, password);    
    /* Autenticar novamente o usuário com as novas credenciais */
    return this.authState.reauthenticateWithCredential(credential)
      .then( () => {   /* Atualiza o email */
        return this.authState.updateEmail(newEmail);
      });
  }
  public updatePassword(password: string, newPassword: string): Promise<void> { 
    let email = this.authState.email;
    console.log("Updating user password for: ", email);
    /* Constante para reautenticar o usuário com as novas credenciais */
    let credential = auth.EmailAuthProvider.credential(email, password);  
   /* Autenticar novamente o usuário com as novas credenciais */
    return this.authState.reauthenticateWithCredential(credential)
      .then( () => {   /* Atualiza a senha */
        return this.authState.updatePassword(newPassword);
      });
  }
  public signIn(email: string, password: string): Promise<any>  {
    console.log("Signing in as: " + email);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  public forgotPassword(email: string): Promise<void> {
    console.log("Resetting the password for: " + email);
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  public resetPassword(code: string, newPassword: string): Promise<void> {
    /* TODO: Busca o que há para ser feito
    * this.afAuth.auth verifica a confirmação de redefinição de senha */
    console.log("Confirming the password with code: " + code);
    return this.afAuth.auth.confirmPasswordReset(code, newPassword)
  }
  public signInWith(provider: string, lang: string = undefined): Promise<boolean> {
    if(lang) { /* Instrui o firebase para usar um idioma específico */
      this.afAuth.auth.languageCode = lang;
    }
    console.log("Signing-in using: " + provider);
    let authProvider = null;
    switch(provider) { /* Faz o login pela rede social escolhida */
      case 'google':
      authProvider = new auth.GoogleAuthProvider();
      break;      
      case 'facebook':
      authProvider = new auth.FacebookAuthProvider();
      break;
      case 'twitter':
      authProvider = new auth.TwitterAuthProvider();
      break;
    }
   if(authProvider === null) {
      return Promise.reject({
        code: 'auth/unsupported',
        message: 'Unsupported provider'
      });
    }
    return this.afAuth.auth.signInWithPopup(authProvider)
      .then( credential => credential !== null);
  }
  public signOut(): Promise <void> {
    console.log("Signing-out");
    return this.afAuth.auth.signOut();
  }
  public deleteUser(password: string): Promise<void> {
    let email = this.authState.email;    
    console.log("Deleting the user ", email);
    /* Obtém credenciais novas para o usuário atual */
    let credential = auth.EmailAuthProvider.credential(email, password);
    /* Autenticar novamente o usuário com as novas credenciais */
    return this.authState.reauthenticateWithCredential(credential)
      /* Em seguida, exclui a conta e sai */
      .then( () => this.authState.delete() );
  }  
}