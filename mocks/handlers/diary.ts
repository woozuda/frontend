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
  http.get("/api/diary/notes", async () => {
    await delay(300);
    return HttpResponse.json(MockDiaryLibs.createDiaryNotes(), { status: 200 });
  }),
  http.post("api/diary", async () => {
    return HttpResponse.json({
      id: 1000,
    });
  }),
  http.get("api/diary/:id", async () => {
    return HttpResponse.json({
      id: 10,
      title: "다이어리 제목",
      subject: ["주제 1", "주제 2", "주제 3", "주제 4"],
      imgUrl: "https://picsum.photos/400/400",
      startDate: "2024-11-26",
      endDate: "2024-11-27",
      noteCount: 10,
      noteList: [
        {
          type: "자유",
          note: {
            diary: "다이어리 제목",
            title: "일기 제목",
            tag: ["일기 태그 1", "일기 태그 2"],
            date: "2024-12-04 22:00:00",
            weather: "날씨",
            season: "계절",
            feeling: "감정",
            content: "일기 내용",
          },
        },
        {
          type: "질문",
          note: {
            diary: "다이어리 제목",
            question: "질문",
            title: "일기 제목",
            tag: ["질문 태그 1", "질문 태그 2"],
            date: "2024-12-04 21:00:00",
            weather: "날씨",
            season: "계절",
            feeling: "감정",
            content: "일기 내용",
          },
        },
        {
          type: "회고",
          note: {
            diary: "다이어리 제목",
            title: "일기 제목",
            tag: ["일기 태그 1", "일기 태그 2"],
            date: "2024-12-02 23:00:00",
            content: [
              "일기 부분 내용 1",
              "일기 부분 내용 2",
              "일기 부분 내용 3",
            ],
          },
        },
      ],
    });
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
