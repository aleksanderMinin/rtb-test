import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../block';

@Component({
  selector: 'email-block',
  template: `
    <div class="email-block" [ngClass]="{'invalid-block': block.isValid === false}">
      <span class="">{{block.address}}
        <div class="icon-x" (click)="delete()"></div>
      </span>
    </div>`,
  styleUrls: ['./email-block.component.less']
})
export class EmailBlockComponent {

  @Input('block') block: Block;

  @Output() deleted = new EventEmitter<Block>();

  delete(): void {
    this.deleted.emit(this.block);
  }
}
