import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

export class HttpService {
    static inject() { return [HttpClient] };

    constructor(private http: HttpClient) {}

    public getUser(username: string) {
        return this.http.get("/api/github/" + username)
            .then(res => JSON.parse(res.response));
    }

    public getFollowers(url: string) {
        return this.http.get(url).then(res => JSON.parse(res.response));
    }
}