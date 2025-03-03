import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  images:string[]=[
    'https://ecomerce-sepia.vercel.app/images/slider-image-1.jpeg',
    'https://ecomerce-sepia.vercel.app/images/slider-image-2.jpeg',
    'https://ecomerce-sepia.vercel.app/images/slider-image-3.jpeg'
  ]

}
