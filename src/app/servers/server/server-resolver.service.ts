import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string
}

// this is important because we get the data from server, and array of servers would not be availble everytime if user hits refresh
export class ServerResolver implements Resolve<Server>{

    constructor(private serversService: ServersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        // throw new Error("Method not implemented.");
        return this.serversService.getServer(+route.params['id']);
    }

}