import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/diary", async () => {
    await delay(300);
    return HttpResponse.json(
      {
        diaryList: [
          {
            id: 12,
            title: "다이어리 이름 1",
            subject: ["다이어리 주제 1", "다이어리 주제 2"],
            imgUrl: "https://picsum.photos/400/400",
            startDate: "2024-11-24",
            endDate: "2024-11-25",
            noteCount: 10,
          },
          {
            id: 11,
            title: "다이어리 이름 2",
            subject: ["다이어리 주제 1", "다이어리 주제 2"],
            imgUrl: "https://picsum.photos/400/400",
            startDate: "2024-12-08",
            endDate: "2025-01-25",
            noteCount: 20,
          },
          {
            id: 10,
            title: "다이어리 이름 3",
            subject: ["주제 1", "주제 2", "주제 3"],
            imgUrl: "https://picsum.photos/400/400",
            startDate: "2024-10-24",
            endDate: "2024-10-25",
            noteCount: 30,
          },
        ],
      },
      { status: 200 }
    );
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
