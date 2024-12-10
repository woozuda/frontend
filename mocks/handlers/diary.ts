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
  //랜덤 커버 생성
  http.post("api/diary/random", () => {
    return HttpResponse.json({
      url: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
    });
  }),
  //다이어리 생성
  http.post("api/diary/create", () => {
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 300,
    // })
    return HttpResponse.json({
      diaryId: 1,
      diaryName: "woozuda",
      diaryTheme: "일상",
      diaryType: "random",
      diaryCover:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fspace%2F&psig=AOvVaw1tbz6L4Y99OUU9fp7lslO4&ust=1732825335125000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICbuser_YkDFQAAAAAdAAAAABAK",
    });
  }),
];
