import { infos } from "@/app/data/infos";

let infosData = [...infos];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (title) {
    const info = infosData.find((item) => item.title === title);
    if (info) {
      return Response.json(info);
    } else {
      return new Response(JSON.stringify({ error: "Мэдээлэл олдсонгүй" }), {
        status: 404,
      });
    }
  }
  return Response.json(infosData);
}
export async function POST(req) {
  const body = await req.json();
  const { title, description, image, url } = body;
  if (!title || !description || !image || !url) {
    return new Response(
      JSON.stringify({
        error: "title, description, image, url заавал",
      }),
      { status: 400 }
    );
  }
  const newInfo = {
    id: infosData.length + 1,
    title,
    description,
    image,
    url,
  };
  infosData.push(newInfo);
  return new Response(
    JSON.stringify({
      message: "Шинэ мэдээлэл амжилттай нэмэгдлээ!",
      infos: newInfo,
    })
  );
}
