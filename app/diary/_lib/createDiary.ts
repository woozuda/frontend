import { CreateInfo as ICreateInfo } from "@/app/models/diary";

export async function createDiary(createInfo: ICreateInfo) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/diary`, {
      method: "post",
      body: JSON.stringify({
        title: createInfo.title,
        subject: createInfo.subject,
        imgUrl: createInfo.imgUrl,
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json()

    return data
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}
