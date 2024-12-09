import { delay, http, HttpResponse } from "msw";
import { MockDiaryLibs } from "../libs";

export const handlers = [
  http.get("/api/diary", async () => {
    await delay(300);
    return HttpResponse.json(MockDiaryLibs.createDiaryList(), { status: 200 });
  }),
  http.get("/api/diary/dates", async () => {
    await delay(300);
    return HttpResponse.json(MockDiaryLibs.createDiaryDates(), { status: 200 });
  }),
  http.get("api/diary/name", async () => {
    return HttpResponse.json(MockDiaryLibs.createDiaryNames(), { status: 200 });
  }),
  http.post("api/diary", async () => {
    return HttpResponse.json({
      id: 1000,
    });
  }),
  http.get("api/diary/:id", async () => {
    return HttpResponse.json(MockDiaryLibs.createDiary(), { status: 200 });
  }),
  http.patch("api/diary/:id", async () => {
    return HttpResponse.json({
      id: 1000,
    });
  }),
  http.delete("api/diary/:id", async () => {
    return HttpResponse.json({});
  }),
];
