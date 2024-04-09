import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Photo } from '../interfaces/photo';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentUserService } from '../services/current-user.service';


/**
 * The upload-panel component is responsible for handling a users upload requests
 * Here are it's responsibilities:
 * -> Retrieving photo's and their information from the user
 * -> Uploading this information to the backend
 * -> Emitting a new Photo object upon successful upload
*/
@Component({
  selector: 'app-upload-panel',
  standalone: true,
  imports: [ NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './upload-panel.component.html',
  styleUrl: './upload-panel.component.css'
})
export class UploadPanelComponent { 

  // This output emits when new photos should be added
  @Output() newPhotoAdded = new EventEmitter<Photo>();

  constructor(private httpService: HttpService, private currentUserService: CurrentUserService) {}

  // date and location form controls to get photo information from user
  date = new FormControl('');
  location = new FormControl('');

  file?: File;
  fileError: string = "";

  showUploadPrompt: boolean = false;
  imagePath?: string | ArrayBuffer | null;

  //This parses the file that is uploaded to the upload panel
  //This WILL NOT trigger if a user attempts to upload the same file twice in a row
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

    //check if a file is an image type, PNG, JPEG, WEBP, etc
    if(this.file?.type.match(/image\/*/) == null){
      this.fileError = "only images are allowed.";
    }

    if(this.file){

      // Write the image data to a variable as a data url
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



  onSubmitUpload(){

    // Build a photo from the given information
    const photo: Photo = {
      user: this.currentUserService.getCurrentUser().name as string,
      location: this.location.value as string,
      dateTaken: this.date.value as string,
      data: this.imagePath as string,
    }

    //Use the httpService to upload the photo
    this.httpService.uploadPhoto(photo).subscribe({
      next: (response) =>{
        this.newPhotoAdded.emit(photo);
        this.exitUpload();
      },
      error: (err) =>{console.log(err)}
    })

    
  }

  //Cancel an upload request
  exitUpload(){
    this.showUploadPrompt = false;
    this.file = undefined;
    this.imagePath = undefined;
  }
  
  

}
