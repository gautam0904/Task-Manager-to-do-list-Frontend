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
  
  private seat = new BehaviorSubject<number[] | undefined>(undefined);
  seat$ = this.seat.asObservable();

  setseatData(value: number[]) {
    this.seat.next(value);
  }

  setProfileData(value: IUser) {
    this.profile.next(value);
  }
}
