export async function uploadCover(formData: FormData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/upload`,
        {
          method: "post",
          body: JSON.stringify({
            formData
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
  
      return data;
    } catch (err) {
      console.error(err);
      return { message: "server_error" };
    }
  }
  