import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Block } from './block';
// import { _ } from '../../../node_modules/lodash/lodash.js';
import * as $ from 'jquery';

var _ = require('lodash');

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

  resizeTextarea(): void {
    var $blocks: any = $('email-block');
    if ($blocks.length > 0 ) {
      let formWidth = ;
      $blocks.toArray().forEach(block => {
        let width = $(block).width();
      });
    }
    // $blocks.forEach(block => {
    //   let width = $(block);
    // });
  };

  addBlock(address: string): void {
    if (address.match(/[,;].*$/)) {
      this.addBlock(address.slice(1));
      return;
    }

    const block: Block = new Block(address);
    this.blocks.push(block);
    this.inputFormPlaceholder = 'add mode people...';
    this.resizeTextarea();
  };

  ngDoCheck() {
    let x = 1;
  };

  onDeleted(block: Block): void {
    _.remove(this.blocks, (it: Block) => {
      return it.address === block.address;
    });

    if (this.blocks.length === 0) {
      this.inputFormPlaceholder = 'Enter names or email addresses';
    }

    this.resizeTextarea();
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
          if (!this.inputEmail.match(/[,;]$/)){
            this.addBlock(this.inputEmail);
          }

          resetInput();
        }
      break;
      default:
      break;
    }
  }

}
