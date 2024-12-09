
export async function unshareNote(alarm: number[]) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/note/unshare`,
        {
          method: "post",
          headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({ alarm }),
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
  