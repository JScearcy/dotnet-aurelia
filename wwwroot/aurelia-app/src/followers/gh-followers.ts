import {HttpService} from "../services/http-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";

export class GhFollowers {
    static inject() { return [HttpService, EventAggregator] }

    private followers;

    constructor(private httpService: HttpService, private ea: EventAggregator) {
        this.ea.subscribe("gh-search", user => {
            this.followers = [];
            this.httpService.getFollowers(user.login)
                .then(followers => this.followers = followers);
        });
    }
}