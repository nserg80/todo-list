export enum EStatus {
  completed = 'Completed',
  notCompleted = 'Not completed',
}

export interface ITask {
  title: string;
  desc: string;
  isCompleted: boolean;
}
