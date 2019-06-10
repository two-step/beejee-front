import {Component, OnInit} from '@angular/core';
import {TableComponent} from '../../common/table.component';
import {ITask} from '../task.model';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'app-task-list',
  templateUrl: '../../common/table.component.html',
  styleUrls: ['../../common/table.component.css']
})
export class TaskListComponent extends TableComponent implements OnInit {

  constructor(private _taskService: TaskService, private _router: Router, private _loadingService: TdLoadingService) {
    super();
    this.columns = [
      {name: 'userName', label: 'User', sorted: true},
      {name: 'email', label: 'Email', sorted: true},
      {name: 'description', label: 'Description'},
      {name: 'status', label: 'Status', sorted: true}
    ];
    this.displayedColumns = ['userName', 'email', 'description', 'status'];
  }

  ngOnInit() {
    this._loadingService.register();
    this._taskService.getTasks().subscribe(
      tasks => {
        this.dataSource.data = tasks;
        this._loadingService.resolve();
       }
    );
  }
  rowClick(task: ITask) {
    this._router.navigateByUrl(`task?id=${task.id}`);
  }
}
