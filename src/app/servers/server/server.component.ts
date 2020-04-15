import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log("ServerComponent loaded...");
    // const id: number = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     const id: number = +params['id'];
    //     this.server = this.serversService.getServer(id);
    //   }
    // );

    // server-resolver is used, it is giving us the server data
    // server-resolves run before a component is run
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // 'server' is the key in the resolver property.
        // 'server' is the same key we used in app-routing.module.ts
      }
    )
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    // can also use queryParamsHandling as 'merge' if this route had its own query parameters
  }

}
