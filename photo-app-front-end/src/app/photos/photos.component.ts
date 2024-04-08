import { Component, Input, NgModule } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgFor, NgIf } from '@angular/common';
import { PhotoInfoComponent } from '../photo-info/photo-info.component';
import { UploadPanelComponent } from '../upload-panel/upload-panel.component';
import _ from 'lodash';

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

  selectedPhoto?: Photo;
  onSelect(photo: Photo): void {
    this.selectedPhoto = photo;
    console.log("clicked!");
  }

  returnFromPhoto(event:boolean){
    console.log(event);
    this.selectedPhoto = undefined;
  }

  addPhoto(event: Photo){
    this.photos.push(event);
  }

  deletePhoto(event: Photo){
    _.remove(this.photos, (element: Photo) => {return element._id == event._id})
  }


}
