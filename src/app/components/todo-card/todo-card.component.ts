import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask, EStatus } from '../../typings';
@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  EStatus = EStatus;
  @Input() data: ITask;
  @Output() removeEvent = new EventEmitter();
  @Output() markCompletedEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  remove(): void {
    this.removeEvent.emit();
  }
  
  markCompleted() {
    this.markCompletedEvent.emit();
  }
}
