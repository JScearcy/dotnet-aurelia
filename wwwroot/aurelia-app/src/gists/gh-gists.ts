import {HttpService} from "../services/http-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";

export class GhGists {
    static inject() { return [HttpService, EventAggregator] }

    private gists;

    constructor(private httpService: HttpService, private ea: EventAggregator) {
        this.ea.subscribe("gh-search", username => {
            this.gists = [];
            this.httpService.getGists(username)
                .then(gists => {
                    gists.map(gist => {
                        gist.fileString = "";
                        for (let key in gist.files)
                        {
                            gist.fileString += key + "; ";
                        }
                        return gist
                    })
                    this.gists = gists
                });
        });
    }
}