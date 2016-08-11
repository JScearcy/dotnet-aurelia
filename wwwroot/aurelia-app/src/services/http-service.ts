import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

export class HttpService {
    static inject() { return [HttpClient] };

    constructor(private http: HttpClient) {}

    public getUser(username: string) {
        return this.fetchApiItem("/api/github/singleuser?username=", username);
    }

    public getFollowers(username: string) {
        return this.fetchApiItem("/api/github/followers?username=", username);
    }

    public getFollowing(username: string) {
        return this.fetchApiItem("/api/github/following?username=", username);
    }

    public getGists(username: string) {
        return this.fetchApiItem("/api/github/gists?username=", username);
    }

    public fetchApiItem(url: string, username: string) {
        return this.http.get(url + username)
            .then(res => JSON.parse(res.response));
    }
}