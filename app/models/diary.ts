export enum NoteType {
  COMMON = "COMMON",
  QUESTION = "QUESTION",
  RETROSPECTIVE = "RETROSPECTIVE",
}

export interface Diary {
  id: number;
  title: string;
  subject: string[];
  imgUrl: string;
  startDate: string;
  endDate: string;
  noteCount: number;
  page?: {
    content: DiaryNote[];
  };
}

export interface DiaryNote {
  type: NoteType;
  note: Note;
}

export interface DiaryName {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  diary: string;
  title: string;
  question?: string;
  tag: string[];
  date: string;
  weather: string;
  season: string;
  feeling: string;
  content: string[];
}

export interface NoteDate {
  date: string;
  count: number;
}

export interface CreateInfo {
  title: string;
  subject: string[];
  imgUrl: null | FormData | string;
}

export interface sections {
  name: string;
  description: string;
}

export interface Retrospect {
  retrospectId: number;
  type: "FOUR_F_S" | "PMI" | "KPT" | "SCS";
  description: string;
  sections: sections[];
  color: string;
}

export interface RetrospectText {
  [sectionName: string]: string;
}

export interface CreateRetrospect {
  type: "FOUR_F_S" | "PMI" | "KPT" | "SCS";
  diaryId: number;
  title: string;
  date: Date;
  content: string[];
}
