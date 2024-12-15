import { CreateRetrospect as ICreateRetrospect } from "@/app/models/diary";

export async function createRetrospect({
  type,
  diaryId,
  title,
  date,
  content,
}: ICreateRetrospect) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/note/retrospective`,
      {
        method: "post",
        body: JSON.stringify({
          type,
          diaryId,
          title,
          date,
          content,
        }),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data;

  } catch (err) {
    console.error(err);
    throw err
  }
}
