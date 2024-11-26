import { http, HttpResponse } from "msw";
import { handlers as diaries } from "./handlers/diary";
import { handlers as notes } from "./handlers/note";

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
];
