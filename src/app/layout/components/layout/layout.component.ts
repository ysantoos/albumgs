import { Component } from '@angular/core';
import { IuserInfo } from 'src/app/core/interfaces/user.interface';
import { GoogleApiService } from 'src/app/core/services/google/google-api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent{

  userInfo?: IuserInfo;

  /**
   *
   */
  constructor(private readonly googleApi: GoogleApiService) {
    this.googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info
    });
  }

  protected signOut(){
    this.googleApi.signOut();
  }

}
