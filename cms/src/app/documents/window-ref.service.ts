import { Injectable } from '@angular/core';

@Injectable()
  
export class WindRefService {

  constructor() { }

  public getNativeWindow() {
    return window;
  }
}