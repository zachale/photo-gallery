import { Component, Input, Output, input } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpService } from '../services/http.service';

/**
 * The photo info component is responsible for showcasing one selected photo
 * This includes:
 * -> Taking a selected photo as input and displaying it
 * -> Fascilitating Updating and Deletion of photos
 * -> Emiting requests to add / delete photos
*/
@Component({
  selector: 'app-photo-info',
  standalone: true,
  imports: [
    NgIf, FormsModule 
  ],
  templateUrl: './photo-info.component.html',
  styleUrl: './photo-info.component.css'
})
export class PhotoInfoComponent {
  @Input() inputPhoto?:Photo;
  @Output() escapeRequest = new EventEmitter<boolean>();
  @Output() deleteRequest = new EventEmitter<Photo>();

  constructor(private httpService: HttpService) {}

  //requests that the page returns from photo-info view to the photos list
  returnFromPhoto(photo: Photo | undefined): void {
    this.canEdit = false;
    this.escapeRequest.emit(true);
  }

  canEdit?: Boolean;
  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  deletePhoto(){
    const photo = this.inputPhoto;
    this.escapeRequest.emit(true);
    if(photo){
      this.httpService.deletePhoto(photo).subscribe({
        next: (response) => {this.deleteRequest.emit(photo); console.log(photo)},
        error: (err) => {console.error(err)}
      });
      this.toggleEdit();
    } else {
      console.error("photo does not exist")
    }
    
    
  }

  //Saves an edit made on a photo to the server
  saveEdit(){
    
    if(this.inputPhoto){
      this.httpService.updatePhoto(this.inputPhoto).subscribe({
        next: (response) => { console.log(response)}
      });
      this.toggleEdit();
    } else {
      console.error("photo does not exist")
    }
    
  }

}
