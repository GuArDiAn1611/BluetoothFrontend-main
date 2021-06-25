import { Component, OnInit } from '@angular/core';
import { BtTestService } from './bt-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BluetoothFrontend';

  constructor(private btTest : BtTestService){}

  ngOnInit(){}

  onClick(){
    console.log("Start");
    this.btTest.getBatteryLevel().subscribe(res => {
      console.log("Battery Level : ",res);
    });
    // console.log(this.btTest.getDevice());
    console.log("End");
  }
}
