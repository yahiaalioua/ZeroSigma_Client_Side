import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setItem(key: string, value: any) {
    // if json, stringify it
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    // detect and parse json later
    return localStorage.getItem(key);
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
