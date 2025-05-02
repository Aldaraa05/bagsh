import { Hicheel } from "@/app/api/teachers/Hicheel";
export async function GET(Request) {
  const allTeachers = [];
  for (const mainCat in Hicheel) {
    for (const subCat in Hicheel[mainCat]) {
      for (const subjectGroup in Hicheel[mainCat][subCat]) {
        allTeachers.push(...Hicheel[mainCat][subCat][subjectGroup]);
      }
    }
  }

  return new Response(
    JSON.stringify({
      teachers: allTeachers,
      categories: Hicheel,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
