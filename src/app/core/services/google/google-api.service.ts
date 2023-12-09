import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { IuserInfo } from '../../interfaces/user.interface';
import { Observable, Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    'youtoken.apps.googleusercontent.com',
  scope:
    'openid profile email https://www.googleapis.com/auth/photoslibrary.readonly',
};

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  photo = 'https://photoslibrary.googleapis.com';
  userProfileSubject = new Subject<IuserInfo>();

  constructor(
    private readonly httpCliente: HttpClient,
    private readonly oAuthService: OAuthService
  ) {
    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as IuserInfo);
          });
        }
      });
    });
  }

  getalbums(): Observable<any> {
    return this.httpCliente.get(`${this.photo}/v1/albums?pageSize=50`, {
      headers: this.authHeader(),
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
      Accept: 'application/json',
    });
  }
}
