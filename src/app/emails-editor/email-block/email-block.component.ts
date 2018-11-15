import { Component, Input, Output, EventEmitter, HostBinding, SimpleChanges } from '@angular/core';

import { Block } from '../block';

import * as _ from 'lodash';

@Component({
  selector: 'email-block',
  template: `
    <span class="">{{block?.address}}
    </span>
    <div class="icon-x" (click)="delete()"></div>`,
  styleUrls: ['./email-block.component.less']
})
export class EmailBlockComponent {

  @Input('block') block: Block;

  @Output() deleted = new EventEmitter<Block>();

  @HostBinding('class.invalid-block') invalidBlockClass: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.invalidBlockClass = !_.get(changes, 'block.currentValue').isValid;
  };

  delete(): void {
    this.deleted.emit(this.block);
  }
}
