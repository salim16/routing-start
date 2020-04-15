import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    console.log("HomeComponent loaded...");
  }

  onLoadServers() {
    // some complex calculation
    // this.router.navigate(['/servers/salim']);
    this.router.navigate(['/servers', 'salim']);
  }

  // this would render both server/salim and servers/salim/{serverId}/edit components,
  // since it is a child of /server/salim, and it can only be rendered from within 
  // servers component
  onLoadServer(serverId: number) {
    // this.router.navigate(['/servers', 'salim', serverId, 'edit'])
    this.router.navigate(['/servers', 'salim', serverId, 'edit'], 
                        {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
