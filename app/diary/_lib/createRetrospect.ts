import { CreateRetrospect as ICreateRetrospect } from "@/app/models/diary";

export async function createRetrospect({
    retrospectId,
    type,
    date,
    diaryId,
    title,
    retrospectText, 
}: ICreateRetrospect) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/note/retrospect`,
      {
        method: "post",
        //body
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
    throw err
  }
}
