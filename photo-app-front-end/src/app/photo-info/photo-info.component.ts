import { Component, Input, Output, input } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { EventEmitter } from '@angular/core';
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
  @Input() inputPhoto?:Photo;
  @Output() escapeRequest = new EventEmitter<boolean>();


  returnFromPhoto(photo: Photo | undefined): void {
    this.escapeRequest.emit(true);
  }

  canEdit?: Boolean;
  toggleEdit(): void {
    this.canEdit = !this.canEdit;
  }

}
