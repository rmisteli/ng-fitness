import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  exercises: {value: string, viewValue: string}[] = [
    {value:'crunches', viewValue:'Crunches'},
    {value:'touch-toes', viewValue:'Touch Toes'},
    {value:'side-lunges', viewValue:'Side Lunges'},
    {value:'burpees', viewValue:'Burpees'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

}
