import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("HomeComponent loaded...");
  }

  onLoadServers() {
    // some complex calculation
    // this.router.navigate(['/servers/salim']);
    this.router.navigate(['/servers', 'salim']);
  }

  onLoadServer(serverId: number) {
    // this.router.navigate(['/servers', 'salim', serverId, 'edit'])
    this.router.navigate(['/servers', 'salim', serverId, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
}
