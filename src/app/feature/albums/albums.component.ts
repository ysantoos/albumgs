import { Component, OnInit } from '@angular/core';
import { Ialmbum } from 'src/app/core/interfaces/album.interface';
import { GoogleApiService } from 'src/app/core/services/google/google-api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  
  listAlbum: Ialmbum[] = [];

  /**
   *
   */
  constructor(private readonly googleApi: GoogleApiService) {
  }
  
  ngOnInit(): void {
    this.getAlbums();
  }


  private getAlbums()
  {
    this.googleApi.getalbums().
    subscribe(res => {
      this.listAlbum = res.albums;
      this.getsort();
    });
  }

  protected isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }
  
  private getsort()
  {
    this.listAlbum.sort((a, b) => (a.title > b.title) ? 1 : -1);
  }


}
