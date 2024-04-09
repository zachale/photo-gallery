import { Component, Input, NgModule } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgFor, NgIf } from '@angular/common';
import { PhotoInfoComponent } from '../photo-info/photo-info.component';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';
import _ from 'lodash';
import { CurrentUserService } from '../services/current-user.service';



/**
 * The photos component's is responsible for diplaying all of a users photos
 * -> It takes a list of photos as input, and displays them
 * -> It listens to the photo-info component to know when to add or delete photos
*/
@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    PhotoInfoComponent,
    UploadPanelComponent
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {

  @Input() photos: Photo [] = [];

  constructor(private userHandler: CurrentUserService) {}

  //current user name
  username: string = this.userHandler.getCurrentUser().name as string;

  selectedPhoto?: Photo;
  onSelect(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  //hide photo-info, show list of photos again
  returnFromPhoto(event:boolean){
    this.selectedPhoto = undefined;
  }

  addPhoto(event: Photo){
    this.photos.push(event);
  }

  deletePhoto(event: Photo){
    console.log(this.photos);
    _.remove(this.photos, (element: Photo) => {return element._id == event._id})
  }


}
