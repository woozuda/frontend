
export async function setAlarm(status: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/my/alarm/${status}`,
      {
        method: "post",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ }),
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
