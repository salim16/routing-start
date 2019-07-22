import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
 
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("UserComponent loaded...");
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // only the subscription code will run on ng on init
    // since subscribe is an observable, it would run only when params change
    // one important thing is even if the component is destroyed and re-initialiized, the subscription is never destroyed
    // threfore we destroy it explicity in ngOnDestroy method 
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.paramsSubscription.unsubscribe();
  }

}
