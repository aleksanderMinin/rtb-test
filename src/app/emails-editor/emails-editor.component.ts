import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Block } from './block';
// import { _ } from '../../../node_modules/lodash/lodash.js';
import * as $ from 'jquery';

var _ = require('lodash');

@Component({
  selector: 'emails-editor',
  templateUrl: './emails-editor.component.html',
  styleUrls: ['./emails-editor.component.less']
})
export class EmailsEditorComponent implements OnChanges, OnDestroy, OnInit {

  constructor() { }

  inputFormPlaceholder: string = 'Enter names or email addresses';

  blocks: Array<Block> = [];

  inputEmail: string = '';

  @Input('emailAddress') addEmail: string = null;

  @Output() emailsCount = new EventEmitter<number>();

  addBlock(address: string): void {
    // Remove "," ";" from start of string
    if (address.match(/^[,;].*$/)) {
      this.addBlock(address.slice(1));
      return;
    }

    // Remove "," ";" from end of string
    if (address.match(/^.*[,;]$/)) {
      this.addBlock(address.slice(0, address.length - 1));
      return;
    }

    // Discard doubles
    if (_.findIndex(this.blocks, (block: Block) => { return block.address == address; }) > -1) {
      return;
    }

    const block: Block = new Block(address);
    this.blocks.push(block);
    this.inputFormPlaceholder = 'add more people...';
    setTimeout(() => {
      $('.input-form')[0].scrollTop = 999;
    }, 10);
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
  };

  ngOnChanges(changes: SimpleChanges) {
    var newMail = _.get(changes, 'addEmail.currentValue');
    if (newMail) {
      this.addBlock(newMail);
    }
  };

  ngOnInit(): void {
    $('textarea').on('paste', (event: any) => {
      this.onPaste(event.target);
    })
  };

  ngOnDestroy(): void {
    $('textarea').off('paste', this.onPaste);
  };

  onPaste(target: any): void {
    setTimeout(() => {
      let text: string = target.value.trim();
      while (text.match(/[,;]/)) {
        this.addBlock(text.slice(0, text.match(/[,;]/).index));
        text = text.slice(text.match(/[,;]/).index + 1);
      }

      if (text.length > 0) {
        this.addBlock(text);
      }

      this.inputEmail = '';
    }, 50);
  };

  keyPress(event: any) {
    const key: string = event.key;

    switch (key) {
      case ';':
      case ',':
      case 'Enter':
      case 'focusout':
        if (this.inputEmail.length > 0) {
          if (!this.inputEmail.match(/^[,;]$/)){
            this.addBlock(this.inputEmail);
          }

          this.inputEmail = '';
          event.returnValue = false;
        }
      break;
      default:
      break;
    }
  };

}
