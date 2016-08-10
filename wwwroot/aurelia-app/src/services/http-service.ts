import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

export class HttpService {
    static inject() { return [HttpClient] };

    constructor(private http: HttpClient) {}

    public getUser(username: string) {
        return this.http.get("/api/github/singleuser?username=" + username)
            .then(res => JSON.parse(res.response));
    }

    public getFollowers(username: string) {
        return this.http.get("/api/github/followers?username=" + username)
            .then(res => JSON.parse(res.response));
    }

    public getFollowing(username: string) {
        return this.http.get("/api/github/following?username=" + username)
            .then(res => JSON.parse(res.response));
    }
}