import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file33: File;
  @Output() completed = new EventEmitter<string>();

  task: AngularFireUploadTask;

  percentage$: Observable<number>;
  snapshot$: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadURL: string;

  private destroy= new Subject<void>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload22();
  }

  ngOnDestroy(): void {
     this.destroy.next();    this.destroy.complete();
  }
  startUpload22(): void {
     const path = `${this.file33.type.split('/')[0]}/${Date.now()}_${this.file33.name}`;
                  //  image/103152123235_fileName.jpg
                   // this above line he write to define a name for each uploded file

     const storageRef = this.storage.ref(path);

     this.task = this.storage.upload(path, this.file33);

     this.percentage$ = this.task.percentageChanges();
     this.snapshot$ = this.task.snapshotChanges();

     this.snapshot$.pipe(
                        takeUntil(this.destroy),
                        finalize(async () => {
                                        this.downloadURL = await storageRef.getDownloadURL().toPromise();
                                        this.completed.next(this.downloadURL);
                        })
                    ).subscribe();

  }
}
