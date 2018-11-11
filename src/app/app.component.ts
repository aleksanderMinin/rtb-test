import { Component, OnInit } from '@angular/core';
import { Utils } from './utils';
import { BLOCKS } from './default-blocks';

@Component({
    selector: 'app-component',
    template: `
        <emails-editor (count)="onCount($event)" [emailAddress]="emailAddress">
            Loading...
        </emails-editor>
        <div class='app-buttons'>
            <button (click)="addEmail()">Add email</button>
            <button (click)="getEmailsCount()">Get email count</button>
        </div>`,
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    name: string = '';

    emailsCount: number = 0;

    emailAddress: string = '';

    onCount(count: number) {
        this.emailsCount = count;
    };

    ngOnInit() {
        // add default blocks
        BLOCKS.forEach((block, index) => {
            setTimeout(() => {
                this.emailAddress = block.address;
            }, 50 * index);
        })
    };

    addEmail(): void {
        const local: string = Utils.randomString(Utils.randomNumber(1, 20));
        const domain: string = Utils.randomString(Utils.randomNumber(4, 10));
        const zone: string = Utils.randomString(Utils.randomNumber(2, 4));

        this.emailAddress = `${local}@${domain}.${zone}`;
    };

    getEmailsCount(): void {
        var count: number = this.emailsCount;
        alert(`There ${count !== 1 ? `are ${count === 0 ? 'no' : count} emails` : 'is 1 email'}.`);
    }
}
