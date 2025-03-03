import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input({required:true}) rating!: number;
  ratings:number[] = [1,2,3,4,5]

}
