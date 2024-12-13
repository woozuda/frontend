"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const onSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get("email") || !(formData.get("email") as string)?.trim()) {
    return { message: "no_email" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)) {
    return { message: "not_email" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }

  let shouldRedirect = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
      method: "post",
      body: JSON.stringify({
        username: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 404) {
      return { message: "user_not_found" };
    }

    const setCookies = res.headers.getSetCookie();
    const authSetCookies = setCookies.find((setCookie) =>
      setCookie.includes("Authorization")
    );
    if (authSetCookies) {
      const [key, value] = authSetCookies.split("=");
      cookies().set(key, value);
    }

    // await res.json();
    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return { message: "server_error" };
  }
  if (shouldRedirect) {
    revalidatePath("/home");
    redirect("/home"); // try/catch문 안에서 X
  }
};

export default onSubmit;
