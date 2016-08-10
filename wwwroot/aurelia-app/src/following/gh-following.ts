import {HttpService} from "../services/http-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";

export class GhFollowing {
    static inject() { return [HttpService, EventAggregator] }

    private followings;

    constructor(private httpService: HttpService, private ea: EventAggregator) {
        this.ea.subscribe("gh-search", user => {
            this.followings = [];
            this.httpService.getFollowing(user.login)
                .then(followers => this.followings = followers);
        });
    }
}