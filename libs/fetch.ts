export async function fetchData<T>(url: string, tag?: string) {
  try {
    const req = await fetch(url);

    if (req.status !== 200) {
      throw new Error(`Error fetching API - tag: ${tag}`);
    }

    const res = (await req.json()) as T;
    return res;
  } catch (error) {
    console.log(error);
  }
}
