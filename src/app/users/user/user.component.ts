import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  // styles: ['.notes{color: green}']
})
export class UserComponent implements OnInit, OnDestroy {
 
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("UserComponent loaded...");
    //snapshot runs only one time, when the component is first created.
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // only the subscription code will run on ng on init
    // since params on the route is an observable, it would run only when params change
    // one important thing is even if the component is destroyed and re-initialiized, 
    // the subscription is never destroyed
    // threfore we destroy it explicity in ngOnDestroy method 
    // Remember Angular handles the the unsubscription for you only for built in observables,
    // like this one, but not for custom observables, for custom ones you need to unsubscribe 
    // explicitly

    // And If you know that the component will not be reloaded when we are already within
    // the component, then you do not need this subscription of params observable
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
