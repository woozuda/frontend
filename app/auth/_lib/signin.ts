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
  if (
    !/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]+$/.test(
      formData.get("password") as string
    )
  ) {
    return { message: "valid_password" };
  }
  if (formData.get("password") !== formData.get("password-check")) {
    return { message: "check_password" };
  }

  let shouldRedirect = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/join`, {
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

    if (res.status === 403) {
      return { message: "user_exists" };
    }

    // await res.json();
    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return { message: "server_error" };
  }
  if (shouldRedirect) {
    redirect("/home"); // try/catch문 안에서 X
  }
};

export default onSubmit;
