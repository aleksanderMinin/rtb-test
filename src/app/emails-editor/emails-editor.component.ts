import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { Block } from './block';

import * as $ from 'jquery';
import * as _ from 'lodash';

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

  @Output() count = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    this.addBlock(_.get(changes, 'addEmail.currentValue'));
  };

  ngOnInit(): void {
    $('textarea').on('paste', this.onPaste.bind(this));
  };

  ngOnDestroy(): void {
    $('textarea').off('paste', this.onPaste);
  };

  addBlock(address: string): void {
    // Discard doubles or empty address
    address = address.trim();
    const hasDouble = _.findIndex(this.blocks, (block: Block) => { return block.address == address; }) > -1;
    if (!address || address.length == 0 || hasDouble) {
      return;
    }

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

    this.blocks.push(new Block(address));
    this.blocksChanged();

    // Beuty scroll
    setTimeout(() => {
      let $input = $('.input-form');
      $input.animate({
        scrollTop : $input[0].scrollHeight
      }, 100 , 'linear' );
    }, 50);
  };

  onDeleted(block: Block): void {
    _.remove(this.blocks, (it: Block) => {
      return it.address === block.address;
    });
    this.blocksChanged();
  };

  blocksChanged(): void {
    if (this.blocks.length === 0) {
      this.inputFormPlaceholder = 'Enter names or email addresses';
    } else {
      this.inputFormPlaceholder = 'add more people...';
    }

    this.count.emit(this.blocks.length);
  };

  onPaste(event: ClipboardEvent): void {
    setTimeout(() => {
      let text: string = (event.target as any).value;
      while (text.match(/[,;]/)) {
        this.addBlock(text.slice(0, text.match(/[,;]/).index));
        text = text.slice(text.match(/[,;]/).index + 1);
      }

      this.addBlock(text);
      this.inputEmail = '';
    }, 50);
  };

  inputEvent(event: KeyboardEvent | FocusEvent) {
    let key: string;
    if (event instanceof KeyboardEvent) {
      key = event.key;
      // Android chrome
      if (key === 'Unidentified' && event.keyCode === 229) {
        key = ((event.target as any).value as string).slice(-1);
      }
    } else {
      key = event.type;
    }

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
