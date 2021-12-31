import {NgModule} from "@angular/core";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {TrainingRoutingModule} from "./training-routing.module";
import {SharedModel} from "../shared/shared.model";

import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModel,
    AngularFirestoreModule,
    TrainingRoutingModule
  ],
  exports: []
})
export class TrainingModule {}
