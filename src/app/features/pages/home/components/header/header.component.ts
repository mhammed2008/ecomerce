import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  images:string[]=[
    './images/slider-image-1.jpeg',
    './images/slider-image-2.jpeg',
    './images/slider-image-3.jpeg'
  ]

}
