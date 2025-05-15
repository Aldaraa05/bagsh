import { basketItems } from "@/app/data/basket";
import { students } from "@/app/data/students";

let basketItemsList = [...basketItems];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (studentId) {
    const student = students.find((student) => student.id === studentId);
    if (student) {
      const basket = basketItemsList.find(
        (item) => item.studentId === studentId
      );
      if (basket) {
        return Response.json(basket);
      } else {
        return new Response(
          JSON.stringify({ error: "Студентийн сагс олдсонгүй" }),
          {
            status: 404,
          }
        );
      }
    } else {
      return new Response(JSON.stringify({ error: "Студент олдсонгүй" }), {
        status: 404,
      });
    }
  }
  return Response.json(basketItemsList);
}

export async function POST(req) {
  const body = await req.json();
  const { name, subject, rating, price, studentId } = body;
  if (!name || !subject || !rating || !price || !studentId) {
    return new Response(
      JSON.stringify({
        error:
          "name, subject, rating, price, studentId заавал оруулах шаардлагатай",
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
    studentId, 
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
