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
  content: string | string[];
}

export interface NoteDate {
  date: string;
  count: number;
}

export interface CreateInfo {
  diaryName: string;
  diaryTheme: string[];
  diaryCover: null | FormData | string;
  diaryCoverType: string;
}

export interface sections {
  name: string;
  description: string;
}

export interface Retrospect {
  retrospectId: number;
  retrospectName: string;
  description: string;
  sections: sections[];
  color: string;
}

export interface RetrospectText {
  [sectionName: string]: string;
}

export interface CreateRetrospect {
  retrospectId: number;
  type: "회고";
  diaryId: number;
  date: Date;
  title: string;
  retrospectText: RetrospectText;
}
