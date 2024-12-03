import { http, HttpResponse } from "msw";
import { handlers as diaries } from "./handlers/diary";
import { handlers as images } from "./handlers/image";
import { handlers as notes } from "./handlers/note";
import { handlers as retrospects} from "./handlers/retrospect";

export const handlers = [
  //로그인
  http.post("api/login", () => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "woozuda",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  //회원가입
  http.post("api/signin", () => {
    return HttpResponse.json(
      {
        userId: 2,
        nickname: "woozuda2",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  //로그아웃
  http.post("api/logout", () => {
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
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
  ...diaries,
  ...notes,
  ...images,
  ...retrospects,
];
