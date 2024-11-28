import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("api/note", () => {
    return HttpResponse.json({
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
  http.delete("api/note", () => {
    return HttpResponse.json({ id: [100, 101, 102] });
  }),
  http.get("api/note/share", () => {
    return HttpResponse.json({});
  }),
  http.get("api/diary/:id/note/common/:id", () => {
    return HttpResponse.json({
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
    });
  }),
  http.get("api/diary/:id/note/question/:id", () => {
    return HttpResponse.json({
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
    });
  }),
  http.get("api/diary/:id/note/retrospect/:id", () => {
    return HttpResponse.json({
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
    });
  }),
  http.post("api/diary/:id/note/common", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.post("api/diary/:id/note/question", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.post("api/diary/:id/note/retrospect", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/diary/:id/note/common/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/diary/:id/note/question/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/diary/:id/note/retrospect/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
];
