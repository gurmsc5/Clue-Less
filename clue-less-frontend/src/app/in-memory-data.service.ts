import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 1, name: 'Mrs. White'},
      { id: 2, name: 'Professor Plum'},
      { id: 3, name: 'Mrs. Peacock'},
      { id: 4, name: 'Colonel Mustard'},
      { id: 5, name: 'Mr. Green'}
    ];
    return {players};
  }
}
