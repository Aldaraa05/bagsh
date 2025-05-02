import { basketItems } from "@/app/data/basket";

let basketItemsList = [...basketItems];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (name) {
    const basket = basketItemsList.find((item) => item.name === name);
    if (basket) {
      return Response.json(basket);
    } else {
      return new Response(JSON.stringify({ error: "Мэдээлэл олдсонгүй" }), {
        status: 404,
      });
    }
  }
  return Response.json(basketItemsList);
}
export async function POST(req) {
  const body = await req.json();
  const { name, subject, rating, price } = body;
  if (!name || !subject || !rating || !price) {
    return new Response(
      JSON.stringify({
        error: "name, subject, experience, price, rating заавал",
      }),
      { status: 400 }
    );
  }
  const newBasket = {
    id: basketItemsList.length + 1,
    name,
    subject,
    rating,
    price,
  };
  basketItemsList.push(newBasket);
  return new Response(
    JSON.stringify({
      message: "Шинэ сагс амжилттай нэмэгдлээ!",
      basketItems: newBasket,
    }),
    { status: 201 }
  );
}
