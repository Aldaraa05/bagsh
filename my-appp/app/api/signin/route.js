import { students } from "@/app/data/students";
import { teachers } from "@/app/data/teachers";

let studentsList = [...students];
let teacherList = [...teachers];

export async function POST(req) {
  const body = await req.json();
  const { gmail, password } = body;

  if (!gmail || !password) {
    return new Response(
      JSON.stringify({ error: "gmail болон password шаардлагатай" }),
      { status: 400 }
    );
  }

  // Эхлээд сурагчдаас хайна
  const student = studentsList.find(
    (s) => s.gmail === gmail && s.password === password
  );

  if (student) {
    return new Response(
      JSON.stringify({
        message: "Сурагч амжилттай нэвтэрлээ",
        role: "student",
        user: student,
      }),
      { status: 200 }
    );
  }

  // Хэрэв сурагч биш бол багшаас хайна
  const teacher = teacherList.find(
    (t) => t.gmail === gmail && t.password === password
  );

  if (teacher) {
    return new Response(
      JSON.stringify({
        message: "Багш амжилттай нэвтэрлээ",
        role: "teacher",
        user: teacher,
      }),
      { status: 200 }
    );
  }

  // Аль аль нь биш бол
  return new Response(
    JSON.stringify({ error: "Нэвтрэх мэдээлэл буруу байна" }),
    { status: 401 }
  );
}
