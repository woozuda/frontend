export async function getMy() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/my/email`,
      {
        method: "get",
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
    throw err;
  }
}
