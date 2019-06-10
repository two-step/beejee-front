import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TdDialogService, TdFileUploadComponent, TdLoadingService} from '@covalent/core';
import {Observable, Subscription} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from './task.service';
import {MatSlideToggle, MatSnackBar} from '@angular/material';
import {encode, decode} from 'base64-arraybuffer';
import {ITask, Task} from './task.model';
import {SecurityService} from '../login/security.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  @ViewChild('fileUpload') private fileUpload: TdFileUploadComponent;

  private subscriptions: Subscription[] = new Array<Subscription>();
  id: string;
  @Input() task: ITask = new Task();
  repeatPsw = '';
  private fileType = 'gif';
  done = false;

  objectURL: string;
  file: File;
  disabled = false;
  url: SafeResourceUrl = '../../assets/noimage.jpg';
  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private _router: Router,
              private _snackBarService: MatSnackBar,
              private sanitizer: DomSanitizer,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              public _securityService: SecurityService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.id) {
          this._loadingService.register();
          this.taskService.getTask(params.id).subscribe(
            task => {this.task = task;
                  this.loadPhoto();
                  this.disabled = !this._securityService.isAdmin;
                  this.done = this.task.status === 'DONE' ? true : false;
                  this._loadingService.resolve();
            }
          );
        }
      }
    );
  }

  selectEvent(file: File): void {
    console.log(`............${file.size}................ ${file.type.substring(6)}`);
    if (file.size > 200_000) {
      this._dialogService.openAlert({
        message: 'Please, choose a picture that less than 200Кб.',
        closeButton: 'Close',
        title: 'Not allowed size of file.',
        width: '600px'
      });
      this.fileUpload.cancel();
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    };
  }

  uploadEvent(file: File): void {
    console.log('............UPLOAD................');
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event: any) => {
      this.task.picture = encode(event.target.result);
      this.fileUpload.cancel();
      if (this.task.id) {
        this._loadingService.register();
        this.taskService.uploadPhoto(this.task.id, event.target.result).subscribe(
          resp => {
            this.task = resp;
            this.loadPhoto();
            this.fileUpload.cancel();
            this._loadingService.resolve();
            this._snackBarService.open('Picture has been uploaded.', '', {duration: 2000,
              verticalPosition: 'top', horizontalPosition: 'center'});
          }
        );
      } else {
        this._dialogService.openAlert(
          {
            message: 'As this is new task, so the picture ' +
              'will bee stored after button Save pressed.',
            closeButton: 'Close',
            title: 'Attention!',
            width: '600px'
          }
        );
      }
    };
  }

  cancelEvent(): void {
    console.log('............CANCEL................');
    this.loadPhoto();
  }

  ngOnDestroy() {
    this.subscriptions ? this.subscriptions.forEach(sub => sub.unsubscribe()) : unescape('');
    this.objectURL ? URL.revokeObjectURL(this.objectURL) : unescape('');
  }

  save() {
    this._loadingService.register();
    this.done ? this.task.status = 'DONE' : this.task.status = 'NEW';
    const method: Observable<ITask> = this.task.id ? this.taskService.save(this.task) : this.taskService.create(this.task);
    this.subscriptions.push(this.taskService.save(this.task).subscribe(
      task => {
        this.task = task;
        this.loadPhoto();
        this._loadingService.resolve();
        this._snackBarService.open('Task has been updated', '', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'});
      }
    ));
  }
  private loadPhoto() {
    if (this.task.picture) {
      const blob = new Blob([ decode(this.task.picture)], {type: 'application/octet-stream'}); // pass a useful mime type here
      this.objectURL = URL.createObjectURL(blob);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectURL);
    } else {
      this.url = '../../assets/noimage.jpg';
    }
  }

}
