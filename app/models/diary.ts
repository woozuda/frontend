export enum NoteType {
  COMMON = "common",
  QUESTION = "question",
  RETROSPECTIVE = "retrospective",
}

export enum RetrospectiveEnums {
  FOUR_F_S = "FOUR_F_S",
  PMI = "PMI",
  KPT = "KPT",
  SCS = "SCS"
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
  date: string;
  content: string[];
  diaryId: number;
  question?: string;
  tag?: string[];
  weather?: string;
  season?: string;
  feeling?: string;
  framework?: RetrospectiveEnums; 
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
  type: RetrospectiveEnums;
  description: string;
  sections: sections[];
  color: string;
}

export interface RetrospectNote {
  id: number;
  diaryId: number;
  diary: string;
  title: string;
  date: string;
  framework: RetrospectiveEnums;
  content: string[];
}

export interface RetrospectText {
  [sectionName: string]: string;
}

export interface CreateRetrospect {
  type: RetrospectiveEnums;
  diaryId: number;
  title: string;
  date: string;
  content: string[];
}
