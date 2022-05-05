import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { ITask } from '../typings';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  state$ = new BehaviorSubject<ITask[]>([])

  constructor(private http: HttpClient) { }

  getTasks(): void {
    const url = `/assets/data/data.json`;
    this.http.get<ITask[]>(url)
      .pipe(
        map(r => {
          r.sort((a: ITask, b: ITask) => Number(a.isCompleted) - Number(b.isCompleted));
          return r
        }),
        take(1)
      )
      .subscribe(r => this.state$.next(r));
  }

  removeTask(index: number): void {
    this.state$.getValue().splice(index, 1);
  }

  removeAllCompleted(): void {
    this.state$.next(this.state$.getValue().filter(task => !task.isCompleted))
  }

  markAllCompleted(): void {
    this.state$.getValue().forEach(task => task.isCompleted = true)
  }

  markCompleted(index: number): void {
    this.state$.getValue()[index].isCompleted = true;
    this.state$.getValue().sort((a: ITask, b: ITask) => Number(a.isCompleted) - Number(b.isCompleted));
  }

  addTask(task: ITask): void {
    this.state$.getValue().unshift(task);
  }
}
