import { Http, HttpLibs } from "@/app/lib/http";
import { Diary, DiaryName } from "../models/diary";

export class DiaryAPI {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  async getDiaries() {
    const response = await this.http.get(`api/diary`);
    return HttpLibs.toJson<{ diaryList: Diary[] }>(response);
  }

  async getDiaryNames() {
    const response = await this.http.get(`api/diary/name`);
    return HttpLibs.toJson<{ nameList: DiaryName[] }>(response);
  }

  async createDiary() {
    const response = await this.http.post("api/diary");
    return HttpLibs.toJson<{ id: number }>(response);
  }

  async getDiary(id: number, page: number, size: number) {
    const searchParams = new URLSearchParams();
    searchParams.set("page", String(page));
    searchParams.set("size", String(size));
    const api = `api/diary/${id}?${searchParams}`;
    const response = await this.http.get(api);

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
