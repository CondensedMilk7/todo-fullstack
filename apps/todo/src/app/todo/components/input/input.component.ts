import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'todo-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  @Output() addItem = new EventEmitter<string>();

  description = new FormControl('', [Validators.required]);

  onAddItem() {
    this.addItem.emit(this.description.value);
    this.description.reset();
  }
}
