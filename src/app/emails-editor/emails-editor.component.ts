import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Block } from './block';

var _ = require('lodash')

@Component({
  selector: 'emails-editor',
  templateUrl: './emails-editor.component.html',
  styleUrls: ['./emails-editor.component.less']
})
export class EmailsEditorComponent implements OnChanges {

  constructor() { }

  inputFormPlaceholder: string = 'Enter names or email addresses';

  blocks: Array<Block> = [];

  inputEmail: string = '';

  @Input('emailAddress') addEmail: string = null;

  @Output() emailsCount = new EventEmitter<number>();

  addBlock(address: string): void {
    const block: Block = new Block(address);
    this.blocks.push(block);
    this.inputFormPlaceholder = 'add mode people...';
  };

  onDeleted(block: Block): void {
    _.remove(this.blocks, (it: Block) => {
      return it.address === block.address;
    });

    if (this.blocks.length === 0) {
      this.inputFormPlaceholder = 'Enter names or email addresses';
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    var newMail = _.get(changes, 'addEmail.currentValue');
    if (newMail) {
      this.addBlock(newMail);
    }
  }

  keyPress(event: any) {
    const key: string = event.key;
    const resetInput = () => {
      this.inputEmail = '';
      event.returnValue = false;
    };

    switch (key) {
      case ';':
      case ',':
      case 'Enter':
      case 'focusout':
        if (this.inputEmail.length > 0) {
          // if (!(this.inputEmail === ',' || this.inputEmail === ';')) {
            this.addBlock(this.inputEmail);
          // }

          resetInput();
        }
      break;
      default:
        if (this.inputEmail.match(/[,;]$/)) {
          resetInput();
        }
      break;
    }
  }

}
