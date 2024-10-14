import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {
  @Input() color: string = 'blue';
  @Input() id: string = '';
  @Output() cellClick: EventEmitter<void> = new EventEmitter();

  onClick() {
    if (this.color === 'yellow') {
      this.cellClick.emit();
    }
  }

}
