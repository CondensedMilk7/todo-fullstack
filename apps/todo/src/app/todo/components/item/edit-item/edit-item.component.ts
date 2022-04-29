import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'todo-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditItemComponent implements OnInit, OnChanges {
  @Input() description!: string;
  @Output() newDesc = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<string>();

  newDescControl = new FormControl('', Validators.required);
  descMatching = true;

  ngOnChanges(changes: SimpleChanges): void {
    const descriptionChange = changes['description'];
    // Prepopulates input with current description
    if (descriptionChange) {
      this.newDescControl.reset(descriptionChange.currentValue);
    }
  }

  ngOnInit(): void {
    this.newDescControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) => {
        this.descMatching = value === this.description;
      });
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }

  onSaveEdit() {
    this.saveEdit.emit(this.newDescControl.value);
  }
}
