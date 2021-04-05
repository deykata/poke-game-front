import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UiModalComponent implements OnInit, OnChanges {
  @Input() trigger: boolean;
  @Input() closable: boolean = true;
  @Output() close = new EventEmitter<boolean>();
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.trigger.currentValue != change.trigger.previousValue) {
      this.show = change.trigger.currentValue;
    }
  }

  closeModal() {
    if (!this.closable) return;
    this.show = false;
    this.close.emit(true);
  }

}
