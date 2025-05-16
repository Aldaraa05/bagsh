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
export async function PUT(req) {
  const body = await req.json();
  const { id, fName, lName, gmail, phone, password, age } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "id заавал оруулна уу." }), {
      status: 400,
    });
  }

  const index = studentsList.findIndex((s) => s.id === id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ error: "Ийм ID-тай оюутан олдсонгүй." }),
      { status: 404 }
    );
  }

  // Давхардлыг шалгана (бусад сурагчидтай харьцуулж)
  const isDuplicate = studentsList.some(
    (s, i) => i !== index && (s.gmail === gmail || s.phone === phone)
  );

  if (isDuplicate) {
    return new Response(
      JSON.stringify({
        error: "Энэ gmail эсвэл утасны дугаар аль хэдийн бүртгэлтэй байна",
      }),
      { status: 409 }
    );
  }

  const updatedStudent = {
    ...studentsList[index],
    fName: fName ?? studentsList[index].fName,
    lName: lName ?? studentsList[index].lName,
    gmail: gmail ?? studentsList[index].gmail,
    phone: phone ?? studentsList[index].phone,
    password: password ?? studentsList[index].password,
    age: age ?? studentsList[index].age,
  };

  studentsList[index] = updatedStudent;

  return new Response(
    JSON.stringify({
      message: "Оюутны мэдээлэл амжилттай шинэчлэгдлээ!",
      student: updatedStudent,
    }),
    { status: 200 }
  );
}
