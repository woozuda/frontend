import { getMonth } from "date-fns";

export enum NoteSeason {
  SPRING = "봄",
  SUMMER = "여름",
  FALL = "가을",
  WINTER = "겨울",
}

export class NoteLibs {
  static isSpring(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 3 && month <= 5 : month >= 9 && month <= 11;
  }
  static isSummer(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 6 && month <= 8 : month >= 12 || month <= 2;
  }
  static isFall(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 9 && month <= 11 : month >= 3 && month <= 5;
  }
  static isWinter(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 12 || month <= 2 : month >= 6 && month <= 8;
  }
  static createSeason(date: Date, isNorth: boolean = true) {
    const month = getMonth(date);

    if (NoteLibs.isSpring(month, isNorth)) {
      return NoteSeason.SPRING;
    }
    if (NoteLibs.isSummer(month, isNorth)) {
      return NoteSeason.SUMMER;
    }
    if (NoteLibs.isFall(month, isNorth)) {
      return NoteSeason.FALL;
    }
    if (NoteLibs.isWinter(month, isNorth)) {
      return NoteSeason.WINTER;
    }
  }
}
