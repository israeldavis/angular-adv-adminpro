import { Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:['./progress.component.css']
})
export class ProgressComponent  {

  progreso1 = 25;
  progreso2 = 75;

  getBarra1() {
    return `${this.progreso1}%`;
  }

  getBarra2() {
    return `${this.progreso2}%`;
  }

}
