import { Component, Input, Output, input } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { EventEmitter } from 'stream';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


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
  @Input() inputPhoto?:Photo = {
    "location":"",
    "id":-1,
    "path":"",
    "dateUploaded":""
  };
  @Output() escapeRequest = new EventEmitter();


  returnFromPhoto(photo: Photo | undefined): void {
    this.inputPhoto = undefined;
    this.escapeRequest.emit("true")
  }

  canEdit?: Boolean;
  toggleEdit(): void {
    this.canEdit = !this.canEdit;
  }

}
