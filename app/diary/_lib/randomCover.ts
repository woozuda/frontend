export async function randomCover() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/random`,
      {
        method: "get",
        //body
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
