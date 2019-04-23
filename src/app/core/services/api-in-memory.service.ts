import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {bookmarks} from './api.data';
import * as uuid from 'uuid/v4';

@Injectable()
export class ApiInMemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {bookmarks};
  }

  genId(): string {
    return uuid();
  }
}
