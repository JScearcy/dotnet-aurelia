import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {GhUrls} from '../const/gh-urls';

export class HttpService {
    static inject() { return [HttpClient, GhUrls] };

    constructor(private http: HttpClient, private urls: GhUrls) {}

    public getUser(username: string) {
        return this.fetchApiItem(this.urls.SingleUser, username);
    }

    public getFollowers(username: string) {
        return this.fetchApiItem(this.urls.Followers, username);
    }

    public getFollowing(username: string) {
        return this.fetchApiItem(this.urls.Following, username);
    }

    public getGists(username: string) {
        return this.fetchApiItem(this.urls.Gists, username);
    }

    public fetchApiItem(url: string, username: string) {
        return this.http.get(url + username)
            .then(res => JSON.parse(res.response));
    }
}
