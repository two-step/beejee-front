import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import {TdDialogService, TdLoadingService} from '@covalent/core';
import {SecurityService} from './security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  public username: string;
  public password: string;

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private _securityService: SecurityService,
              private _dialogService: TdDialogService
              ) {}

  login() {
     this._loadingService.register();

      const subs: Subscription = this._securityService.authenticate(this.username, this.password).subscribe(
        (isAdmin: boolean) => {
          this._securityService.isAdmin = isAdmin;
          isAdmin ? this.enter() : this._dialogService.openAlert({
            message: 'Please check your entered login and password.',
            closeButton: 'Close',
            title: 'User has not been found.',
            width: '600px'
          });
          if (!isAdmin) {
            this._loadingService.resolve();
          }
        },
        error => {
          this._loadingService.resolve();
        }
      );
    this._loadingService.resolve();
  }

  enter() {
    this._router.navigateByUrl('list');
  }
}
