import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/my/email", () => {
    return HttpResponse.json({
      email: "woozuda@gmail.com",
    });
  }),
  http.get("/api/my/aitype", () => {
    return HttpResponse.json({
      "aiType": "PICTURE_NOVEL", 
    });
  }),
  http.get("/api/my/alarm", () => {
    return HttpResponse.json({
      "alarm": "on", 
    });
  }),
  http.post("/api/my/poem", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.post("/api/my/novel", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.post("/api/my/alarm/on", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.post("/api/my/alarm/off", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.get("/api/shortlink", () => {
    return HttpResponse.json({
      shortlink: "pQLgtjo"
    });
  }),
  http.get("/api/shared/note", () => {
    return HttpResponse.json({
      total: 4,
      sharedNotes: [
        {
          date: "2024-12-12",
          notes: [
            {
              type: "COMMON",
              note: {
                id: 1,
                diary: "my first diary",
                title: "나는 노트 1이다",
                date: "2024-12-11",
                noteContents: [
                  "<img src='https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png'/>",
                  "<p>피카츄 라이츄 파이리 꼬부기</p>",
                  "<p>버터플 야도란 피죤투 또가스</p>",
                ],
                feeling: "JOY",
                weather: "SUNNY",
                season: "WINTER",
              },
            },
            {
              type: "QUESTION",
              note: {
                id: 2,
                diary: "my first diary",
                title: "나는 노트 2이다",
                date: "2024-12-11",
                noteContents: ["안먹고 싶어요", "귀찮아요"],
                question: "뭘 먹고 싶나요 ? ",
                feeling: "JOY",
                weather: "SUNNY",
                season: "WINTER",
              },
              // "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
            },
          ],
        },
        {
          date: new Date("2024-11-22"),
          notes: [
            {
              type: "COMMON",
              note: {
                id: 3,
                diary: "my first diary",
                title: "나는 노트 1이다",
                date: "2024-12-11",
                noteContents: [
                  "<p>내가 사랑하는 동안에 할 일이 또 하나 있지</p>",
                  "<p>바람 부는 벌판에 서 있어도 나는 외롭지 않아</p>",
                  "<p>아 영원히 변치 않을 우리들의 사랑으로</p>",
                  "<p>어두운 곳에 손을 내밀어 밝혀주리라</p>",
                ],
                feeling: "JOY",
                weather: "SUNNY",
                season: "WINTER",
              },
            },
            {
              type: "QUESTION",
              note: {
                id: 12341,
                diary: "일상상",
                title: "나는 생각한다 고로 존재한다.",
                question: "나는 누구인가",
                noteContents: [
                  "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus",
                  "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam",
                  "doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti</p>",
                ],
                feeling: "JOY",
                weather: "SUNNY",
                season: "WINTER",
              },
            },
            {
              type: "RETROSPECT",
              note: {
                id: 9,
                diary: "my first diary",
                title: "나는 노트 9",
                date: "2023-01-01",
                noteContents: [
                  "KPT의 첫 부분",
                  "KPT의 두번 째 부분",
                  "KPT의 서번 째 부분",
                ],
                type: "KPT",
              },
            },
            {
              type: "RETROSPECT",
              note: {
                id: 19,
                diary: "my first diary",
                title: "나는 노트 9",
                date: "2023-01-01",
                noteContents: ["pmi 1", "pmi 2", "pmi 3"],
                type: "PMI",
              },
            },
            {
              type: "RETROSPECT",
              note: {
                id: 119,
                diary: "my first diary",
                title: "나는 노트 9",
                date: "2023-01-01",
                type: "FOUR_F_S",
                noteContents: ["f1", "f2", "f3", "f4"],
              },
            },
            {
              type: "RETROSPECT",
              note: {
                id: 1234441,
                diary: "my first diary",
                title: "나는 노트 9",
                date: "2023-01-01",
                type: "SCS",
                noteContents: ["start", "continue", "stop"],
              },
            },
          ],
        },
      ],
    });
  }),
  // http.get("/api/my/shared/ai", () => {
  //   return HttpResponse.json({
  //     total: 2,
  //     sharedAi: [
  //       {
  //         date: new Date("2024-12-12"),
  //         ai: {
  //           type: "그림과소설",
  //           id: 123,
  //           title: "오발탄",
  //           content:
  //             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti",
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
  //         },
  //       },
  //       {
  //         date: new Date("2024-12-19"),
  //         ai: {
  //           type: "그림과시",
  //           id: 1234,
  //           title: "꽃",
  //           content:
  //             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti",
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
  //         },
  //       },
  //     ],
  //   });
  // }),
  http.get("/api/shared/ai", () => {
    return HttpResponse.json({
      total: 2,
      sharedAiCreations: [
        {
          start_date: "2024-11-02",
          aiCreations: [
            {
              "creationType": "POETRY",
              "aiCreation": {
                "ai_creation_id": 3,
                "creationType": "POETRY",
                "start_date": "2024-11-02",
                "end_date": "2024-11-08",
                "image_url": "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
                "text": "시와 소설이에요3"
              }
            },
            {
              "creationType": "POETRY",
              "aiCreation": {
                  "ai_creation_id": 4,
                  "creationType": "POETRY",
                  "start_date": "2024-11-02",
                  "end_date": "2024-11-08",
                  "image_url": "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
                  "text": "시와 소설이에요4"
              }
          }
          ]
        },
      ],
    });
  }),
  http.post("/api/note/unshare", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.post("/api/ai/unshare", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.post("/api/my/type", () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
];
