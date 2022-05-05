import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../services/data.service'
import { ITask } from '../../typings';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  data$: BehaviorSubject<ITask[]>;
  completedCount: number = 0;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTasks();
    this.data$ = this.dataService.state;
  }
  getCompletedCount(data: ITask[]): number {
    return data.filter((item) => item.isCompleted).length
  }

  remove(index: number): void {
    this.dataService.removeTask(index);
  }
  
}
