import { createInfo } from "@/model/diary/createInfo";

export async function createDiary(createInfo: createInfo) {
  console.log(createInfo);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/diary/create`,
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
