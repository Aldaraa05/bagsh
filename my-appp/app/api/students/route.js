import { students } from "@/app/data/students";

let studentsList = [...students];
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (name) {
    const student = studentsList.find((s) => s.name === name);
    if (student) {
      return Response.json(student);
    } else {
      return new Response(JSON.stringify({ error: "Оюутан олдсонгүй" }), {
        status: 404,
      });
    }
  }

  return Response.json(studentsList);
}

export async function POST(req) {
  const body = await req.json();
  const { fName, lName, gmail, phone, password, age } = body;

  // Бүх талбар бөглөгдсөн эсэхийг шалгана
  if (!fName || !lName || !gmail || !phone || !password || !age) {
    return new Response(
      JSON.stringify({
        error: "fName, lName, gmail, phone, password, age заавал",
      }),
      { status: 400 }
    );
  }

  // Давхардсан бүртгэлийг шалгана
  const isExisting = studentsList.some(
    (s) => s.gmail === gmail || s.phone === phone
  );

  if (isExisting) {
    return new Response(
      JSON.stringify({
        error: "Энэ gmail эсвэл утасны дугаар аль хэдийн бүртгэлтэй байна",
      }),
      { status: 409 }
    );
  }

  // Шинэ сурагчийг нэмнэ
  const newStudent = {
    id: studentsList.length + 1,
    fName,
    lName,
    gmail,
    phone,
    password,
    age,
  };

  studentsList.push(newStudent);

  return new Response(
    JSON.stringify({
      message: "Шинэ сурагч амжилттай нэмэгдлээ!",
      student: newStudent,
    }),
    { status: 201 }
  );
}
