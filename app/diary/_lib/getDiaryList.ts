export async function getDiaryList() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/diary`,
          {
            method: "get",
            //body
            credentials: "include",
          })
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json()

          return data

    } catch(err) {
        console.error(err);
        throw err
    }
}