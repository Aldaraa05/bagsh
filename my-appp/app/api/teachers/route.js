import { teachers } from "@/app/data/teachers";

// Runtime дээр өөрчлөгдөх хувьсагч
let teacherList = [...teachers];

export async function GET() {
  return Response.json(teacherList); // бүх багшийг буцаана
}

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    subject,
    experience,
    rating,
    price,
    image,
    certificates,
    subjects,
    achievements,
    schedule,
    teachingMethods,
    history,
    location,
    teamsLink,
  } = body;

  // Шаардлагатай талбарууд
  if (!name || !subject || !experience || !price || !location) {
    return new Response(
      JSON.stringify({
        error: "name, subject, experience, price, location заавал",
      }),
      { status: 400 }
    );
  }

  const newTeacher = {
    id: teacherList.length + 1,
    name,
    subject,
    experience,
    rating: rating || 4.5,
    price,
    image: image || "/zurag/pro.png",
    certificates: certificates || [],
    subjects: subjects || [],
    achievements: achievements || [],
    schedule: schedule || [],
    teachingMethods: teachingMethods || "",
    history: history || "",
    location,
    teamsLink: teamsLink || "",
  };

  teacherList.push(newTeacher);

  return new Response(
    JSON.stringify({
      message: "Шинэ багш амжилттай нэмэгдлээ!",
      teacher: newTeacher,
    }),
    { status: 201 }
  );
}
