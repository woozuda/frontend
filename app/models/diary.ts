export interface Diary {
  id: number;
  title: string;
  subject: string[];
  imgUrl: string;
  startDate: string;
  endDate: string;
  noteCount: number;
  noteList?: DiaryNote[];
}

export interface DiaryNote {
  type: "자유" | "일기" | "회고";
  note: {
    diary: string;
    title: string;
    tag: string[];
    date: string;
    weather: string;
    season: string;
    feeling: string;
    content: string;
  };
}
