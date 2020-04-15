import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("ServersComponent loaded...");
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // navigate method just doesn't know which route is currently loaded up.
    // So it doesn't work relative to active route, to make it work 
    // relatively follow the second approach.
    
    // this.router.navigate(['servers/salim']);
    this.router.navigate(['servers/salim'], {relativeTo: this.route});
  }

}
