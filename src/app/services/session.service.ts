
import { Injectable } from '@angular/core';
import { ISessionService } from './i-session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ISessionService {
  /* Mostra um spinner se for verdadeiro */
  showSpinner: boolean = false
  menus = {  /* Contém todos os itens de menu do aplicativo */
    main: []
  }
  constructor() { }
  setMenu(menuName: string, menu: any[]) {
    this.menus[menuName] = menu
  }  
  menuItemSelected(menuName: string, item: any) {
    let menu = this.menus[menuName]
    menu.forEach(item => item.isActive = false)
    item.isActive = true
  }
}
 