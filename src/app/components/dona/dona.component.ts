import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  // Doughnut
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  // ];
  @Input() tituloGrafica = 'Sin titulo';
  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet;


  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    {backgroundColor: ['#6857E6','#009FEE','#F02059']}
  ];

  constructor() {

   }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
