import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/my", () => {
        return HttpResponse.json({
            username: 'woozuda@gmail.com',
            analysisType: '2',
            alarm: false
        })
    }),
    http.post("/api/my/alarm", () => {
        return HttpResponse.json({
            status: 200
        })
    }),
    http.post("/api/my/shared/note", () => {
        return HttpResponse.json({
            total: 4,
            sharedNotes: [
                {
                    date: new Date('2024-12-12'),
                    notes: [
                        {
                            "type": "COMMON",
                            "note": {
                                "id": 123,
                                "diary": 1,
                                "title": "남해로 떠난 날",
                                "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"
                            },
                            "image" : "",
                        },
                        {
                            "type": "QUESTION",
                            "note": {
                                "id": 1234,
                                "diary": 2,
                                "question": "행복이란",
                                "title": "행복해지는 비결",
                                "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                    ]
                },
                {
                    date: new Date('2024-11-22'),
                    notes: [
                        {
                            "type": "COMMON",
                            "note": {
                                "id": 1235,
                                "diary": 1,
                                "title": "남해로 떠난 날",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "",
                        },
                        {
                            "type": "QUESTION",
                            "note": {
                                "id": 12341,
                                "diary": 1,
                                "question": "나는 누구인가",
                                "title": "나는 생각한다 고로 존재한다.",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                        {
                            "type": "RETROSPECT",
                            "note": {
                                "id": 123411,
                                "diary": 2,
                                "title": "나는 생각한다 고로 존재한다.",
                                "framework": "KPT",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                        {
                            "type": "RETROSPECT",
                            "note": {
                                "diary": 1,
                                "title": "나는 생각한다 고로 존재한다.",
                                "framework": "PMI",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                        {
                            "type": "RETROSPECT",
                            "note": {
                                "id": 123431,
                                "diary": 2,
                                "title": "나는 생각한다 고로 존재한다.",
                                "framework": "FOUR_F_S",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                        {
                            "type": "RETROSPECT",
                            "note": {
                                "id": 1234441,
                                "diary": 1,
                                "title": "나는 생각한다 고로 존재한다.",
                                "framework": "SCS",
                                "content": ["Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus", "et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam" ,"doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti"]
                            },
                            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png"
                        },
                    ]
                }
            ]
        })
    }),
    http.post("/api/my/shared/ai", () => {
        return HttpResponse.json({
            total: 2,
            sharedAi: [
                {
                    date: new Date('2024-12-12'),
                    ai: {
                        "type": "그림과소설",
                        "id": 123,
                        "title": "오발탄",
                        "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti",
                        "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
                    },
                },
                {
                    date: new Date('2024-12-19'),
                    ai: {
                        "type": "그림과시",
                        "id": 1234,
                        "title": "꽃",
                        "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora mollitiLorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus autem tempore blanditiis iste unde quasi dolor ducimus et, accusantium quibusdam tempora molliti",
                        "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/200px-Pok%C3%A9mon_Pikachu_art.png",
                    },
                },
            ]
        })
    }),
    http.post("/api/note/unshare", () => {
        return HttpResponse.json({
            status: 200
        })
    }),
    http.post("/api/ai/unshare", () => {
        return HttpResponse.json({
            status: 200
        })
    }),
    http.post("/api/my/type", () => {
        return HttpResponse.json({
            status: 200
        })
    }),
]