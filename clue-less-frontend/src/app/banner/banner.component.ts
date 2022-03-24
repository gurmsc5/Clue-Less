import { Component, OnInit } from '@angular/core';

import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
  }

  joinSession(): void {
    this.connectionService.joinSession();
  }
}
