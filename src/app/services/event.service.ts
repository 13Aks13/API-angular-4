/**
 * Created by Andrew K. on 15.05.17.
 */


/*
   http://stackoverflow.com/questions/34700438/global-events-in-angular-2
*/

import { EventEmitter } from '@angular/core';

export class EventItem {
    constructor(public id: number, public name: string, public done: boolean) {
    }
}
export class EventService {
    public itemAdded$: EventEmitter<EventItem>;
    private todoList: EventItem[] = [];

    constructor() {
        this.itemAdded$ = new EventEmitter();
    }

    public list(): EventItem[] {
        return this.todoList;
    }

    public add(item: EventItem): void {
        this.todoList.push(item);
        this.itemAdded$.emit(item);
    }
}
