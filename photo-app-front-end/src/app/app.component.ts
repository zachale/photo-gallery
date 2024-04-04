import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotosComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gallery';
}
