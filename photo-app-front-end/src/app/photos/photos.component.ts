import { Component, NgModule } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { PHOTOS } from '../mock-photos';
import { NgFor, NgIf } from '@angular/common';
import { PhotoInfoComponent } from '../photo-info/photo-info.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    PhotoInfoComponent
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  photos = PHOTOS;

  selectedPhoto?: Photo;
  onSelect(photo: Photo): void {
    this.selectedPhoto = photo;
    console.log("clicked!");
  }

  returnFromPhoto(event: Event){
    console.log(event);
    this.selectedPhoto = undefined;
  }


}
