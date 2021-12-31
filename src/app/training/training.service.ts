import {Injectable} from "@angular/core";
import {map, Subscription, take} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";

import {Exercise} from "./exercise.model";
import {UiService} from "../shared/ui.service";

import * as UI from '../shared/ui.actions';
import * as Training from "./training.actions";
import * as fromTraining from "./training.reducer";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private store: Store<fromTraining.State>,
              private uiService: UiService) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db.collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Exercise
            }
          });
        }))
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableExercises(exercises));
        }, error => {
          this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
          this.store.dispatch(new UI.StopLoading());
        })
    );
  }

  fetchCompletedOrCanceledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        })
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartExercise(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopExercise());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress/100),
        calories: ex.calories * (progress/100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopExercise());
    });
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
