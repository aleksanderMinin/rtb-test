import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../block';

@Component({
  selector: 'email-block',
  templateUrl: './email-block.component.html',
  styleUrls: ['./email-block.component.less']
})
export class EmailBlockComponent implements OnInit {

  constructor() { }

  @Input('block') block: Block;

  @Output() deleted = new EventEmitter<Block>();

  delete(): void {
    this.deleted.emit(this.block);
  }

  ngOnInit() {
  }

}
