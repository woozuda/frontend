import { http, HttpResponse } from "msw";
import { handlers as diaries } from "./handlers/diary";
import { handlers as images } from "./handlers/image";
import { handlers as notes } from "./handlers/note";
import { handlers as retrospects} from "./handlers/retrospect";
import { handlers as my } from "./handlers/my";

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
  ...diaries,
  ...notes,
  ...images,
  ...retrospects,
  ...my,
];
