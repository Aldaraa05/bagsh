import { Hicheel } from "@/app/data/lessons";

let lessons = [...Hicheel];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const subject = searchParams.get("subject");
  const teacher = searchParams.get("teacher");

  if (id) {
    const lesson = lessons.find((lesson) => lesson.id === id);
    return new Response(JSON.stringify(lesson || null), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Filter by subject if provided
  let filteredLessons = lessons;
  if (subject) {
    filteredLessons = filteredLessons.filter((lesson) =>
      lesson.subject.toLowerCase().includes(subject.toLowerCase())
    );
  }

  // Filter by teacher if provided
  if (teacher) {
    filteredLessons = filteredLessons.filter((lesson) =>
      lesson.teacher.toLowerCase().includes(teacher.toLowerCase())
    );
  }

  return new Response(JSON.stringify(filteredLessons), {
    headers: { "Content-Type": "application/json" },
  });
}
