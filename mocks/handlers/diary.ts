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
