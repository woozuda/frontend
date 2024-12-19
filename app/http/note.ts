import { Http, HttpLibs } from "@/app/lib/http";
import { isNotNil } from "ramda";
import { NoteSeason } from "../lib/note";
import {
  DiaryNote,
  Note,
  NoteDate,
  RetrospectNote,
  RetrospectiveEnums,
} from "../models/diary";

export interface CreateNoteProps {
  diaryId: number;
  title: string;
  weather: string;
  season: NoteSeason;
  feeling: string;
  date: string;
  content: string;
}

export interface CreateQuestionProps extends CreateNoteProps {
  question: string;
}

export interface NoteUpdateArgs {
  noteId: number;
  diaryId: number;
  title: string;
  weather: string;
  season: string;
  feeling: string;
  date: string;
  content: string;
}

export interface RetrospectUpdateArgs {
  noteId: number;
  diaryId: number;
  title: string;
  date: string;
  type: RetrospectiveEnums | undefined;
  content: string[];
}

export interface NoteResponse {
  content: DiaryNote[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface NoteCountResponse {
  nonRetroCount: number;
  retroCount: number;
}

export class NoteAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getQuestion() {
    const response = await this.http.get("api/question");
    return HttpLibs.toJson<{ question: string }>(response);
  }

  async getNotes(page: number, size: number, date?: string | null) {
    const searchParams = new URLSearchParams();
    if (isNotNil(date)) {
      searchParams.set("date", date);
    }
    searchParams.set("page", String(page));
    searchParams.set("size", String(size));
    const api = `api/note?${searchParams}`;
    const response = await this.http.get(api);
    return HttpLibs.toJson<NoteResponse>(response);
  }

  async deleteNotes(ids: number[]) {
    const response = await this.http.delete("api/note", {
      body: JSON.stringify({ id: ids }),
    });
    return;
  }

  async getNoteShare() {
    const response = await this.http.get("api/note/share");
    return HttpLibs.toJson(response);
  }

  async getNoteDates() {
    const response = await this.http.get("api/note/date");
    return HttpLibs.toJson<{ dateList: NoteDate[] }>(response);
  }

  async getCommonNote(noteId: number) {
    const response = await this.http.get(`/api/note/common/${noteId}`);
    return HttpLibs.toJson<Note>(response);
  }
  async getQuestionNote(questionId: number) {
    const response = await this.http.get(`/api/note/question/${questionId}`);
    return HttpLibs.toJson<Note>(response);
  }
  async getRetrospectNote(retrospectId: number) {
    const response = await this.http.get(
      `/api/note/retrospective/${retrospectId}`
    );
    return HttpLibs.toJson<RetrospectNote>(response);
  }

  async createCommonNote(props: CreateNoteProps) {
    const body = JSON.stringify(props);
    const response = await this.http.post(`/api/note/common`, {
      body,
    });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createQuestionNote(props: CreateQuestionProps) {
    const body = JSON.stringify(props);
    const response = await this.http.post(`/api/note/question`, { body });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createRetrospectNote() {
    const response = await this.http.post(`/api/note/retrospect`);
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async patchCommonNote(args: NoteUpdateArgs) {
    const { noteId, ...body } = args;

    const response = await this.http.patch(`/api/note/common/${noteId}`, {
      body: JSON.stringify(body),
    });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchQuestionNote(args: NoteUpdateArgs) {
    const { noteId, ...body } = args;
    const response = await this.http.patch(`/api/note/question/${noteId}`, {
      body: JSON.stringify(body),
    });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchRetrospectNote(args: RetrospectUpdateArgs) {
    const { noteId, ...body } = args;
    const response = await this.http.patch(
      `/api/note/retrospective/${noteId}`,
      {
        body: JSON.stringify(body),
      }
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async shareNotes(noteIds: number[]) {
    const response = await this.http.post(`/api/shared/note`, {
      body: JSON.stringify({ id: noteIds }),
    });
    return;
  }

  async getSharedNotes() {
    const response = await this.http.get("/api/shared/note", {
      body: JSON.stringify({}),
    });
    return HttpLibs.toJson<{ id: number; user_id: number; type: string }[]>(
      response
    );
  }

  async getNoteCount(startDate: string, endDate: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("startDate", startDate);
    searchParams.set("endDate", endDate);
    const api = `/api/note/count?${searchParams}`;
    const response = await this.http.get(api);

    return HttpLibs.toJson<NoteCountResponse>(response);
  }
}
