"use client";

import { RetrospectText as IRetrospectText } from "@/app/models/diary";
import { RETROSPECT } from "@/app/diary/_component/retrospectData";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect } from "react";

type Props = {
  mode?: string;
  retrospectId: number;
  text: IRetrospectText;
  setText: React.Dispatch<
    React.SetStateAction<{ [sectionName: string]: string }>
  >;
};

export default function WriteRetrospectForm({
  mode,
  retrospectId,
  text,
  setText,
}: Props) {
  const sections = RETROSPECT.filter(
    (retrospect) => retrospect.retrospectId === retrospectId
  )[0].sections;

  const handleInputChange = (sectionName: string, value: string) => {
    if (value.length > 300) {
      toast.error(`${sectionName}은(는) 최대 300자까지만 입력할 수 있습니다.`, {
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }
    setText((prev) => ({
      ...prev,
      [sectionName]: value,
    }));
  };

  useEffect(() => {
    if (mode !== "edit") {
      const initialText = sections.reduce((acc, section) => {
        acc[section.name] = "";
        return acc;
      }, {} as { [key: string]: string });
      setText(initialText);
    }
  }, [sections, setText]);
  console.log(text);

  return sections.map((section) => (
    <div className="flex flex-col gap-2 mb-6" key={section.name}>
      <h1 className="font-bold text-2xl">{section.name}</h1>
      <Label htmlFor={section.name}>{section.description}</Label>
      <Textarea
        id={section.name}
        placeholder="회고를 작성해 보세요."
        value={text[section.name] || ""}
        onChange={(e) => handleInputChange(section.name, e.target.value)}
      />
      <p className="text-right text-sm text-muted-foreground">
        {text[section.name]?.length || 0}/300
      </p>
    </div>
  ));
}
