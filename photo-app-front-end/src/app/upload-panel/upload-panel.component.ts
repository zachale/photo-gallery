import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Photo } from '../interfaces/photo';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-panel',
  standalone: true,
  imports: [ NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './upload-panel.component.html',
  styleUrl: './upload-panel.component.css'
})
export class UploadPanelComponent { 
  @Output() newPhotoAdded = new EventEmitter<Photo>();

  constructor(private httpService: HttpService) {}

  date = new FormControl('');
  location = new FormControl('');

  file?: File;
  fileError: string = "";

  showUploadPrompt: boolean = false;
  imagePath?: string | ArrayBuffer | null;

  async onFileChange(event: Event){

    if(event.target == null){
      this.fileError = "something went wrong"
    } else {
      const target = event.target as HTMLInputElement;
      if(target == null){
        this.fileError = "something went wrong"
      } else {
        this.file = (target.files as FileList)[0];
      }
    }

    if(this.file?.type.match(/image\/*/) == null){
      this.fileError = "only images are allowed.";
    }

    if(this.file){

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imagePath = reader.result;
      })
      reader.readAsDataURL(this.file);


      this.showUploadPrompt = true;
      this.fileError = "";    
    } else {
      this.fileError = "file not found"
    }
  }


  // display photo that user uploaded
  // take info from user in a form
  // send to server to be uploaded
  // (implement jwt)

  onSubmitUpload(){

    // Build a photo from the given information
    const photo: Photo = {
      user: "zach",
      location: this.location.value as string,
      dateTaken: this.date.value as string,
      data: this.imagePath as string,
    }

    const observable = this.httpService.uploadPhoto(photo);
    observable.subscribe({
      error: (err) =>{console.log(err)}
    })

    this.newPhotoAdded.emit(photo);

    this.exitUpload()
  }

  exitUpload(){
    this.showUploadPrompt = false;
    this.file = undefined;
    this.imagePath = undefined;
  }
  
  

}
