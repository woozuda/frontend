import { Http, HttpLibs } from "@/app/lib/http";
import { DiaryNote } from "../models/diary";

export class NoteAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getNotes() {
    const response = await this.http.get("api/note");
    return HttpLibs.toJson<{ noteList: DiaryNote[] }>(response);
  }

  async deleteNotes() {
    const response = await this.http.delete("api/note");
    return HttpLibs.toJson<{ id: number[] }>(response);
  }

  async getNoteShare() {
    const response = await this.http.get("api/note/share");
    return HttpLibs.toJson(response);
  }

  async getCommonNote(diaryId: number, noteId: number) {
    const response = await this.http.get(
      `/api/diary/${diaryId}/note/common/${noteId}`
    );
    return HttpLibs.toJson<DiaryNote>(response);
  }
  async getQuestionNote(diaryId: number, questionId: number) {
    const response = await this.http.get(
      `/api/diary/${diaryId}/note/question/${questionId}`
    );
    return HttpLibs.toJson<DiaryNote>(response);
  }
  async getRetrospectNote(diaryId: number, retrospectId: number) {
    const response = await this.http.get(
      `/api/diary/${diaryId}/note/retrospect/${retrospectId}`
    );
    return HttpLibs.toJson<DiaryNote>(response);
  }

  async createCommonNote(diaryId: number) {
    const response = await this.http.post(`/api/diary/${diaryId}/note/common`);
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createQuestionNote(diaryId: number) {
    const response = await this.http.post(
      `/api/diary/${diaryId}/note/question`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async createRetrospectNote(diaryId: number) {
    const response = await this.http.post(
      `/api/diary/${diaryId}/note/retrospect`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async patchCommonNote(diaryId: number, noteId: number) {
    const response = await this.http.patch(
      `/api/diary/${diaryId}/note/common/${noteId}`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchQuestionNote(diaryId: number, questionId: number) {
    const response = await this.http.patch(
      `/api/diary/${diaryId}/note/question/${questionId}`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }
  async patchRetrospectNote(diaryId: number, retrospectId: number) {
    const response = await this.http.patch(
      `/api/diary/${diaryId}/note/retrospect/${retrospectId}`
    );
    return HttpLibs.toJson<{ id: number }>(response);
  }
}
