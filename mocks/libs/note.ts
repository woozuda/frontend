export class MockNoteLibs {
  static createQuestion() {
    return {
      question: "당신이 가장 행복할 때는 언제인가요?",
    };
  }

  static createNoteList() {
    return {
      content: [
        {
          type: "COMMON",
          note: {
            id: 10,
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
          type: "QUESTION",
          note: {
            id: 11,
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
          type: "RETROSPECTIVE",
          note: {
            id: 12,
            diary: "다이어리 제목",
            title: "일기 제목",
            tag: ["일기 태그 1", "일기 태그 2"],
            date: "2024-12-02 23:00:00",
            framework: "4FS",
            content: [
              "일기 부분 내용 1",
              "일기 부분 내용 2",
              "일기 부분 내용 3",
            ],
          },
        },
      ],
    };
  }

  static deleteNotes() {
    return {
      id: [100, 101, 102],
    };
  }

  static createNoteDates() {
    return {
      dateList: [
        {
          date: "2024-12-08",
          count: 2,
        },
        {
          date: "2024-12-07",
          count: 5,
        },
        {
          date: "2024-12-05",
          count: 10,
        },
        {
          date: "2024-12-04",
          count: 1,
        },
      ],
    };
  }

  static createCommonNote() {
    return {
      id: 111,
      diary: "다이어리 제목",
      title: "일기 제목",
      tag: ["일기 태그 1", "일기 태그 2"],
      date: "2024-12-04 22:00:00",
      weather: "맑음",
      season: "겨울",
      feeling: "기쁨",
      content: "일기 내용",
    };
  }

  static createQuestionNote() {
    return {
      id: 112,
      diary: "다이어리 제목",
      title: "일기 제목",
      question: "오늘의 질문",
      tag: ["일기 태그 1", "일기 태그 2"],
      date: "2024-12-04 22:00:00",
      weather: "맑음",
      season: "겨울",
      feeling: "기쁨",
      content: "일기 내용",
    };
  }

  static createRetrospectNote() {
    return {
      id: 201,
      diary: "다이어리 제목",
      diaryId: 1,
      title: "나는 나비",
      date: "2024-12-04",
      framework: "KPT",
      content: ["이건 K", "이건 P", "이건 T"],
    };
  }
}
