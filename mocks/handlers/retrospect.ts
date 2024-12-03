import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/note/retrospect", () => {
        return HttpResponse.json({
            id: '123'
        })
    })
]