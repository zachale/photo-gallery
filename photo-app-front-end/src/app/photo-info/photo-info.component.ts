import { Component, Input, Output, input } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpService } from '../services/http.service';


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

  returnFromPhoto(photo: Photo | undefined): void {
    this.escapeRequest.emit(true);
  }

  canEdit?: Boolean;
  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  deletePhoto(){
    this.deleteRequest.emit(this.inputPhoto);
    this.escapeRequest.emit(true);
    if(this.inputPhoto){
      this.httpService.deletePhoto(this.inputPhoto).subscribe({
        next: (response) => {console.log(response)}
      });
      this.toggleEdit();
    } else {
      console.error("photo does not exist")
    }
    
    
  }

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
