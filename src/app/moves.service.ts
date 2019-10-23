import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovesService {

  constructor(private httpService: HttpClient) { }

  getMoves() {
    return this.httpService.get('../assets/moves.json');
  }

}
