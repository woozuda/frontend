import { Http, HttpLibs } from "@/app/lib/http";
import { isNotNil } from "ramda";
import { NoteSeason } from "../lib/note";
import { DiaryNote, Note, NoteDate } from "../models/diary";

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

export class NoteAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getQuestion() {
    const response = await this.http.get("api/question");
    return HttpLibs.toJson<{ quesiton: string }>(response);
  }

  async getNotes(date?: string | null) {
    let api = "api/note";
    if (isNotNil(date)) {
      api += `?date=${date}`;
    }
    const response = await this.http.get(api);
    return HttpLibs.toJson<{ content: DiaryNote[] }>(response);
  }

  async deleteNotes() {
    const response = await this.http.delete("api/note");
    return HttpLibs.toJson<{ id: number[] }>(response);
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
      `/api/note/retrospect/${retrospectId}`
    );
    return HttpLibs.toJson<Note>(response);
  }

  async createCommonNote(props: CreateNoteProps) {
    const body = JSON.stringify(props);
    const response = await this.http.post(`/api/note/common`, {
      body,
    });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createQuestionNote(props: CreateNoteProps) {
    const body = JSON.stringify(props);
    const response = await this.http.post(`/api/note/question`, { body });
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createRetrospectNote() {
    const response = await this.http.post(`/api/note/retrospect`);
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async patchCommonNote(noteId: number) {
    const response = await this.http.patch(`/api/note/common/${noteId}`);
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchQuestionNote(questionId: number) {
    const response = await this.http.patch(`/api/note/question/${questionId}`);
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchRetrospectNote(retrospectId: number) {
    const response = await this.http.patch(
      `/api/note/retrospect/${retrospectId}`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async shareNotes(noteIds: number[]) {
    const response = await this.http.post(`/api/note/share`, {
      body: JSON.stringify({ id: noteIds }),
    });
    return;
  }

  async getSharedNotes() {
    const response = await this.http.get("/api/note/share", {
      body: JSON.stringify({}),
    });
    return HttpLibs.toJson<{ id: number; user_id: number; type: string }[]>(
      response
    );
  }
}
