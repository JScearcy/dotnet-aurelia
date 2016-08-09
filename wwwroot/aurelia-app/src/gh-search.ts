import {HttpService} from "./services/http-service";
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";

export class GhSearch {
    static inject() { return [HttpService, EventAggregator] }
    private displayUser: boolean = false;
    private username: string;
    private profileImg: string;
    
    constructor(private httpService: HttpService, private ea: EventAggregator) {}

    public ghSearch() {
        this.httpService.getUser(this.username)
            .then(userInfo => {
                this.profileImg = userInfo.avatar_url;
                this.displayUser = true;
                this.ea.publish("gh-search", userInfo);
            })
            .catch(err => {
                this.displayUser = false;
                console.error(err);
            });
    }
}