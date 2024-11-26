import { Http, HttpLibs } from "@/app/lib/http";
import { Diary } from "../models/diary";

export class DiaryAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getDiaries() {
    const response = await this.http.get(`api/diary`);
    return HttpLibs.toJson<{ diaryList: Diary[] }>(response);
  }

  async createDiary() {
    const response = await this.http.post("api/diary");
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async getDiary(id: number) {
    const response = await this.http.get(`api/diary/${id}`);
    return HttpLibs.toJson<Diary>(response);
  }

  async patchDiary(id: number) {
    const response = await this.http.patch(`api/diary/${id}`);
    return HttpLibs.toJson<Diary>(response);
  }

  async deleteDiary(id: number) {
    const response = await this.http.delete(`api/diary/${id}`);
    return HttpLibs.toJson<Diary>(response);
  }
}
