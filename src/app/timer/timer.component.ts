import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TimerService } from 'app/timer/timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers:[TimerService]
})


export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndSubscription:Subscription=null;
  private countdownSubscription:Subscription=null;
  public countdown:number=0;

  get progress (){
    return(this.init-(this.countdown )) / this.init*100;
  }


  constructor(public timer:TimerService) { }

  ngOnInit(): void {

    this.timer.restartCountdown(this.init);

    this.countdownEndSubscription= this.timer.countdownEnd$.subscribe(()=>{
      this.onComplete.emit();
    });

    this.countdownEndSubscription=this.timer.countdown$.subscribe((data)=>{this.countdown=data});
  }

  ngOnDestroy(){
   this.timer.destroy();
   this.countdownEndSubscription.unsubscribe();
   this.countdownSubscription.unsubscribe();
  }

}
