import { Component, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service'
import { ITask } from '../../typings';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  data$: BehaviorSubject<ITask[]>;
  completedCount: number = 0;
  modalRef?: BsModalRef;
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.dataService.getTasks();
    this.data$ = this.dataService.state$;
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      desc: new FormControl(null, Validators.required),
    })
  }
  
  getCompletedCount(data: ITask[]): number {
    return data.filter((item) => item.isCompleted).length
  }

  remove(index: number): void {
    this.dataService.removeTask(index);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);

    if (this.modalRef?.onHide) {
      this.subscriptions.push(
        this.modalRef.onHide.subscribe(() => {
            this.form.reset();
        })
      );
    }
  }

  unsubscribe(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];  
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }

    const task: ITask = {
      title: this.form.value.title,
      desc: this.form.value.desc,
      isCompleted: false,
    }

    this.dataService.addTask(task);
    this.modalService.hide();
  }

  removeAllCompleted(): void {
    this.dataService.removeAllCompleted();
  }

  markAllCompleted(): void {
    this.dataService.markAllCompleted();
  }

  markCompletedEvent(index: number) {
    this.dataService.markCompleted(index);
  }

  ngOnDestroy(): void {
    this.unsubscribe();    
  }
}
