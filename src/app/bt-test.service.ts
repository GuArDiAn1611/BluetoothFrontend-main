import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BtTestService {

  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';

  constructor(public ble: BluetoothCore) {}

  getDevice() {
    return this.ble.getDevice$();
  }

  stream() {
    return this.ble.streamValues$().pipe(
      map((value: DataView) => value.getInt8(0))
    );
  }

  disconnectDevice() {
    this.ble.disconnectDevice();
  }

  value() {
    console.log('Getting Battery level...');

    return this.ble
      .value$({
        service: 'battery_service',
        characteristic: 'battery_level'
      });
  }

  getBatteryLevel(): Observable<number> {
    return this.ble.discover$({
          acceptAllDevices:true,
          optionalServices:[
            BtTestService.GATT_PRIMARY_SERVICE
          ]
        }).
        pipe(
          mergeMap( (gatt: BluetoothRemoteGATTServer)  => {
          return this.ble.getPrimaryService$(
            gatt,
            BtTestService.GATT_PRIMARY_SERVICE
          );
        }),
        mergeMap( (primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(
            primaryService,
            BtTestService
               .GATT_CHARACTERISTIC_BATTERY_LEVEL
          );
        }),
        mergeMap(
          (characteristic: BluetoothRemoteGATTCharacteristic) =>  {
            return this.ble.readValue$(characteristic);
          }
        ),
        map( (value: DataView) => value.getUint8(0) ));
  }

}
