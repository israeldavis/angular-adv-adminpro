import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1: string[] = ['Ahorro', 'Perdidas', 'Ganacias'];

  public data1 = [
    [350, 450, 100],
  ];
}
