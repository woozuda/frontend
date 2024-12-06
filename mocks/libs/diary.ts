export class MockDiaryLibs {
  static createDiaryList() {
    return {
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
    };
  }

  static createDiaryDates() {
    return {
      dates: [
        { id: 10, date: new Date("2024-12-03") },
        { id: 10, date: new Date("2024-12-02") },
        { id: 10, date: new Date("2024-12-01") },
        { id: 10, date: new Date("2024-11-20") },
        { id: 10, date: new Date("2024-11-19") },
        { id: 10, date: new Date("2024-11-18") },
        { id: 10, date: new Date("2024-11-17") },
        { id: 10, date: new Date("2024-11-10") },
        { id: 10, date: new Date("2024-11-09") },
        { id: 10, date: new Date("2024-11-08") },
        { id: 10, date: new Date("2024-11-07") },

        { id: 10, date: new Date("2024-10-29") },
        { id: 10, date: new Date("2024-10-28") },
        { id: 10, date: new Date("2024-10-13") },
        { id: 10, date: new Date("2024-10-12") },
        { id: 10, date: new Date("2024-10-03") },
        { id: 10, date: new Date("2024-10-02") },
        { id: 10, date: new Date("2024-10-01") },

        { id: 10, date: new Date("2024-09-30") },
        { id: 10, date: new Date("2024-09-29") },
        { id: 10, date: new Date("2024-09-28") },
        { id: 10, date: new Date("2024-09-27") },
        { id: 10, date: new Date("2024-09-05") },
        { id: 10, date: new Date("2024-09-04") },
        { id: 10, date: new Date("2024-09-03") },
      ],
    };
  }

  static createDiaryNotes() {
    return [
      {
        id: 10,
        title: "다이어리 제목",
        subject: ["주제 1", "주제 2", "주제 3", "주제 4"],
        imgUrl: "https://picsum.photos/400/400",
        startDate: "2024-12-03",
        endDate: "2024-12-05",
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
      },
      {
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
      },
      {
        id: 10,
        title: "다이어리 제목",
        subject: ["주제 1", "주제 2", "주제 3", "주제 4"],
        imgUrl: "https://picsum.photos/400/400",
        startDate: "2024-11-20",
        endDate: "2024-11-24",
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
      },
    ];
  }
}
