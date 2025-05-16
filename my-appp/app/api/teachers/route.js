import { teachers } from "@/app/data/teachers";

let teacherList = [...teachers];

export async function GET() {
  return Response.json(teacherList);
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
export async function PUT(req) {
  const body = await req.json();
  const {
    id,
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

  if (!id) {
    return new Response(JSON.stringify({ error: "ID заавал шаардлагатай." }), {
      status: 400,
    });
  }

  const index = teacherList.findIndex((t) => t.id === id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ error: "Ийм ID-тай багш олдсонгүй." }),
      { status: 404 }
    );
  }

  const updatedTeacher = {
    ...teacherList[index],
    name: name ?? teacherList[index].name,
    subject: subject ?? teacherList[index].subject,
    experience: experience ?? teacherList[index].experience,
    rating: rating ?? teacherList[index].rating,
    price: price ?? teacherList[index].price,
    image: image ?? teacherList[index].image,
    certificates: certificates ?? teacherList[index].certificates,
    subjects: subjects ?? teacherList[index].subjects,
    achievements: achievements ?? teacherList[index].achievements,
    schedule: schedule ?? teacherList[index].schedule,
    teachingMethods: teachingMethods ?? teacherList[index].teachingMethods,
    history: history ?? teacherList[index].history,
    location: location ?? teacherList[index].location,
    teamsLink: teamsLink ?? teacherList[index].teamsLink,
  };

  teacherList[index] = updatedTeacher;

  return new Response(
    JSON.stringify({
      message: "Багш амжилттай шинэчлэгдлээ!",
      teacher: updatedTeacher,
    }),
    { status: 200 }
  );
}
