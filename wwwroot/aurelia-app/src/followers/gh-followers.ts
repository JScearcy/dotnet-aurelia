import {HttpService} from "../services/http-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";

export class GhFollowers {
    static inject() { return [HttpService, EventAggregator] }

    private followers;

    constructor(private httpService: HttpService, private ea: EventAggregator) {
        this.ea.subscribe("gh-search", username => {
            this.followers = [];
            this.httpService.getFollowers(username)
                .then(followers => this.followers = followers);
        });
    }
}