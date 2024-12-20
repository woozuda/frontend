import { Http, HttpLibs } from "@/app/lib/http";
import { Diary, DiaryName, DiaryNote } from "../models/diary";

export interface DiaryResponse {
  id: number;
  title: string;
  subject: string[];
  imgUrl: string;
  startDate: string;
  endDate: string;
  noteCount: number;
  page: {
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
  };
}

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

    return HttpLibs.toJson<DiaryResponse>(response);
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
