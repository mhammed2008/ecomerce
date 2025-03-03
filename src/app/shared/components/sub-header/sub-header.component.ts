import {Component, Input, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sub-header',
  imports: [
    RouterLink
  ],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  @Input({required: true}) title!: string;
}
