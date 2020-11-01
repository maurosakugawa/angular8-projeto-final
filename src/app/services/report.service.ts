import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {
  private _messages: string[] = [];
  constructor() { }
  get messages() : string[] {
    return this._messages;
  }
  clear() {
    this._messages = [];
  }
  add(message: string) {
    this._messages.push(message);
  }
}