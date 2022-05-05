import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { ITask } from '../typings';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  state = new BehaviorSubject<ITask[]>([])

  constructor(private http: HttpClient) { }

  getTasks(): void {
    const url = `/assets/data/data.json`;
    this.http.get<ITask[]>(url)
      .pipe(
        take(1)
      )
      .subscribe(r => this.state.next(r));
  }

  removeTask(index: number): void {
    this.state.getValue().splice(index, 1);
  }
}
