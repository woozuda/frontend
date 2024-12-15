import { http, HttpResponse } from "msw";
import { MockNoteLibs } from "../libs/note";

export const handlers = [
  http.get("api/question", () => {
    return HttpResponse.json(MockNoteLibs.createQuestion());
  }),
  http.get("api/note", () => {
    return HttpResponse.json(MockNoteLibs.createNoteList());
  }),
  http.delete("api/note", () => {
    return HttpResponse.json(MockNoteLibs.deleteNotes());
  }),
  http.get("api/note/date", () => {
    return HttpResponse.json(MockNoteLibs.createNoteDates());
  }),
  http.get("api/note/share", () => {
    return HttpResponse.json({});
  }),
  http.get("api/note/common/:id", () => {
    return HttpResponse.json(MockNoteLibs.createCommonNote());
  }),
  http.get("api/note/question/:id", () => {
    return HttpResponse.json(MockNoteLibs.createQuestionNote());
  }),
  http.get("api/note/retrospective/:id", () => {
    return HttpResponse.json(MockNoteLibs.createRetrospectNote());
  }),
  http.post("api/note/common", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.post("api/note/question", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.post("api/note/retrospective", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/note/common/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/note/question/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.patch("api/note/retrospective/:id", () => {
    return HttpResponse.json({ id: 100 });
  }),
  http.post("api/note/share", () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
