import {HttpService} from "./services/http-service";
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";

export class GhSearch {
    static inject() { return [HttpService, EventAggregator] }

    private displayUser: boolean = false;
    private user;
    private username: string;
    private successCount: number = 0;
    private failCount: number = 0;
    
    constructor(private httpService: HttpService, private ea: EventAggregator) {}

    public ghSearch() {
        this.ea.publish("gh-search", this.username);
        this.displayUser = false;
        this.httpService.getUser(this.username)
            .then(userInfo => {
                this.user = userInfo;
                this.displayUser = true;
                this.successCount++;
            })
            .catch(err => {
                this.failCount++;
                console.error(err);
            });
    }
}
