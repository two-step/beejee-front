export interface ITask {
  id: string;
  email: string;
  description: string;
  status: string;
  picture: any;
  userName: string;
}

export class Task implements ITask {
  description: string;
  email: string;
  id: string;
  picture: any;
  status = 'NEW';
  userName: string;
}
