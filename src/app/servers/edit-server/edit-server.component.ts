import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  // Note that CanComponentDeactivate interface must be declared for the leaving router to work

  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  // changesSaved: boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log("EditServerComponent loaded...");
    // snapshot runs only one time.
    console.log(this.route.snapshot.queryParams);
    console.log("fragent is:" + this.route.snapshot.fragment);
    // queryParams, fragment and params are all observables and we can subscribe to them,
    // so that they can run asynchronoulsy whenever there is change in query param and fragment.
    // without loading the component again
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.server = this.serversService.getServer(id);
      } 
    );
    // this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    // this.changesSaved = true;
    this.router.navigate(['../'], {queryParams: {allowEdit: '1'}, relativeTo: this.route});
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.allowEdit) {
      return true; //if you are not allowed to edit sure you can leave the route
    }

    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status)) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }

}
