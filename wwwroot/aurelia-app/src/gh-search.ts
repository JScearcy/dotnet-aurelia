import {HttpService} from "./services/http-service";
import {inject} from "aurelia-framework";

export class GhSearch {
    static inject() { return [HttpService] }
    private displayUser: boolean = false;
    private username: string;
    private profileImg: string;
    
    constructor(private httpService: HttpService) {}

    public ghSearch() {
        this.httpService.getUser(this.username)
            .then(res => {
                let userInfo = JSON.parse(res.response);
                this.profileImg = userInfo.avatar_url;
                this.displayUser = true;
            })
            .catch(err => {
                this.displayUser = false;
                console.error(err);
            });
    }
}