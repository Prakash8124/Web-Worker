import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { longOperation } from './long-operation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result:any = 0;
  sliderTranslate = 'translateX(0px)';

  private worker:Worker;

  private animation = {
    translate: 0,
    rightDirection: true
  };

  constructor() {
    this.worker = new Worker(new URL('./example.worker', import.meta.url));
  }

  ngOnInit() {
    this.worker.onmessage = ({ data }) => {
      this.result = data
    };
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(this.animateFrame.bind(this))
  }

  private animateFrame(): void {
    this.animation.translate = this.animation.rightDirection ?
                                this.animation.translate + 5 :
                                this.animation.translate - 5;

    if (this.animation.translate > (window.innerWidth * 0.2) + 40) {
      this.animation.rightDirection = false;
    } else if (this.animation.translate < 0){
      this.animation.rightDirection = true;
    }
    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  async handleLongOperation(): Promise<void> {
    // this.worker.postMessage(2500);
    this.result = longOperation(2500);

  }

}
