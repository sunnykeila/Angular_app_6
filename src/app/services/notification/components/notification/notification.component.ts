import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

export interface Notification22 {
   message22: string;
}



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor( @Inject(MAT_SNACK_BAR_DATA)   public data: Notification22
                   ) { }

  ngOnInit(): void {
  }

}
