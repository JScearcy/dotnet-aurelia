import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

export class HttpService {
    static inject() { return [HttpClient] };

    constructor(private http: HttpClient) {}

    public getUser(username: string) {
        return this.http.get("https://api.github.com/users/" + username);
    }

    public getFollowers(url: string) {
        return this.http.get(url)
    }
}