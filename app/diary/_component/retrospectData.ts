import { Retrospect as IRetrospect } from "@/app/models/diary";

export const RETROSPECT: IRetrospect[] = [
  {
    retrospectId: 1,
    retrospectName: "KPT",
    description: "단순하고 빠른 회고가 필요할 때",
    sections: [
      {
        name: "KEEP",
        description: "현재 만족하며 계속해서 이어나갈 점을 적어보세요",
      },
      {
        name: "PROBLEM",
        description: "불편하거나 개선이 필요한 점을 적어보세요",
      },
      {
        name: "TRY",
        description: "앞으로 시도해보고 싶은 개선 사항을 적어보세요.",
      },
    ],
    color: "kpt",
  },
  {
    retrospectId: 2,
    retrospectName: "PMI",
    description:
      "상황을 균형있게 평가하여 아이디어를 검토할 때, 결과보다는 과정에서 얻은 인사이트에 초점을 맞추고 싶을 때",
    sections: [
      { name: "PLUS", description: "좋았던 점을 적어주세요" },
      {
        name: "MINUS",
        description: "부정적인, 안좋았던 점, 개선할 점을 적어주세요.",
      },
      {
        name: "INTEREST",
        description: "신선했던 것, 흥미, 배울 점을 적어주세요."
      }
      
    ],
    color: "pmi",
  },
  {
    retrospectId: 3,
    retrospectName: "4F's",
    description: "경험을 통해 느낀 감정과 배운 점을 깊이 성찰하고 싶을 때",
    sections: [
      { name: "FACT", description: "사실을 적어보세요." },
      { name: "FEELING", description: "해당 경험에서 느낀 감정을 적어보세요." },
      { name: "FINDING", description: "배운 점이나 통찰을 적어보세요." },
      {
        name: "FUTURE ACTION",
        description: "향후에 어떻게 행동할 지 적어보세요.",
      },
    ],
    color: "fs",
  },
  {
    retrospectId: 4,
    retrospectName: "SCS",
    description:
      "나의 목표나 습관을 구체적으로 정리하고 실행방안을 도출하고 싶을 때",
    sections: [
      { name: "STOP", description: "중단할 것을 적어보세요." },
      { name: "CONTINUE", description: "유지할 것을 적어보세요." },
      { name: "START", description: "새롭게 시도할 것을 적어보세요." },
    ],
    color: "scs",
  },
];
