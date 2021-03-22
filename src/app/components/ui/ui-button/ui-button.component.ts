import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent implements OnInit {
  @Input() text: string;
  @Input() full: boolean;
  @Input() disabled: boolean;
  @Output() emitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent() {
    this.emitter.emit(true);
  }

}
