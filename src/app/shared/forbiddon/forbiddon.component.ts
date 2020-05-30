import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-forbiddon',
  templateUrl: './forbiddon.component.html',
  styles: [`
  .error-box {
  height: 70%;
  position: absolute;
  background: url(../../../assets/images/background/error-bg.jpg) no-repeat center center #fff;
  width: 100%; }
  .error-box .footer {
    width: 100%;
    left: 0px;
    right: 0px; }

  .error-body h1 {
    font-size: 210px;
    font-weight: 900;
    text-shadow: 4px 4px 0 #ffffff, 6px 6px 0 #263238;
    line-height: 210px; }

  ` ]
})
export class ForbiddonComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
