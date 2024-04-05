import { Component, NgModule } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { PHOTOS } from '../mock-photos';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf
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

  returnFromPhoto(photo: Photo): void {
    this.selectedPhoto = undefined;
    console.log("clicked!");
  }

  canEdit?: Boolean;
  toggleEdit(): void {
    this.canEdit = !this.canEdit;
  }



}
