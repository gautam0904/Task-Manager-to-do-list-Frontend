import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  
  private profile = new BehaviorSubject<IUser | undefined>(undefined);
  profile$ = this.profile.asObservable();
  
  private boardId = new BehaviorSubject<string | undefined>(undefined);
  boardId$ = this.boardId.asObservable();

  setboardId(value: string) {
    this.boardId.next(value);
  }

  setProfileData(value: IUser) {
    this.profile.next(value);
  }
}
