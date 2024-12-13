import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/note/retrospective", () => {
        return HttpResponse.json({
            id: '123'
        })
    })
]