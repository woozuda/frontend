import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useSubmit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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

      // await res.json();
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return { message: "server_error" };
    }
    if (shouldRedirect) {
      await queryClient.invalidateQueries({ queryKey: ["AUTHORIZATION"] });
      router.push("/home"); // try/catch문 안에서 X
    }
  };

  return onSubmit;
};

export default useSubmit;
