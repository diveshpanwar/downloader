import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  interval = null;
  headingText = '';
  constructor() { }

  ngOnInit(): void {
    const actualText = 'DOWNLOAD INSTAGRAM IMAGE / VIDEO';
    const headingArr = actualText.split('');
    let counter = 0;
    let hold = 0;
    setInterval(() => {
      if (this.headingText === actualText) {
        this.headingText = '';
        counter = 0;
      }
      if (hold < actualText.length - 1) {
        this.headingText = actualText.slice(0, counter + 1);
        counter++;
      } else {
        this.headingText = actualText;
      }
      if (hold > actualText.length + 10) {
        hold = 0;
      }
      hold++;
    }, 100);
  }


  ngOnDestroy() {
    this.interval = null;
  }
}
