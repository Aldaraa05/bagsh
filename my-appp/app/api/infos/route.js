import clientPromise from "@/app/lib/mongodb";

async function generateTeacherId(db, subjectPath) {
  const [mainCategory, subcategory, specificSubject] = subjectPath.split('.');
  

const categoryBases = {
  'Baigaliin_uhaan': 100000,
  'IT': 200000,
  'Sport': 300000,
  'Niigmiin_uhaan': 400000,
  'Humuunlegiin_uhaan': 500000,
  'Business': 600000
};

const subcategoryOffsets = {
  // Baigaliin_uhaan subcategories
  'fizik': 10000,
  'Himi': 20000,
  'Biology': 30000,
  'Math': 40000,
  'Astronomi': 50000,
  'Programchlal': 10000,
  'UgugdliinSan': 20000,
  'Cybersecurity': 30000,
  'fitness': 10000,
  'bumbug': 20000,
  'hooliin_sport': 30000,
  'Tuuh': 10000,
  'Ediin_zasag': 20000,
  'Philosopy': 10000,
  'Marketing': 10000,
  'Management': 20000
};

const subjectOffsets = {
  // Physics subjects
  'klassik_fizik': 1000,
  'kvant_fizik': 2000,
  'atom_fizik': 3000,
  'elektronik': 4000,
  'organik_himi': 1000,
  'analitik_himi': 2000,
  'biokhimi': 3000,
  'amid_biology': 1000,
  'genetik': 2000,
  'ekologi': 3000,
  'yoronhii_math': 1000,
  'discret_math': 2000,
  'matrix_analiz': 3000,
  'tootsoolol': 4000,
  'gurvan_biyet': 1000,
  'odiin_astronomi': 2000,
  'web_dev': 1000,
  'mobile_dev': 2000,
  'ai_programming': 3000,
  'database_design': 1000,
  'sql_mongo': 2000,
  'ethical_hacking': 1000,
  'network_security': 2000,
  'powerlift': 1000,
  'yoga': 2000,
  'crossfit': 3000,
  'sagsan_bumbug': 1000,
  'hulbumbug': 2000,
  'volleyball': 1000,
  'tennis': 2000,
  'mongol_tuuh': 1000,
  'deed_tuuh': 2000,
  'mikro_ediin': 1000,
  'makro_ediin': 2000,
  'uran_zohiol': 1000,
  'filosofi': 2000,
  'digital_marketing': 1000,
  'project_management': 1000
};

  const baseId = categoryBases[mainCategory] + 
                subcategoryOffsets[subcategory] + 
                subjectOffsets[specificSubject];

  // Find the highest existing ID in this subject range
  const highestTeacher = await db.collection('users').findOne(
    { 
      'info.id': { $gte: baseId, $lt: baseId + 1000 },
      role: 'teacher'
    },
    { sort: { 'info.id': -1 } }
  );

  return highestTeacher ? highestTeacher.info.id + 1 : baseId + 1;
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const teacherId = await generateTeacherId(db, body.subjectPath);

    const teacherInfo = {
      id: teacherId,
      subjectPath: body.subjectPath,
      subjects: [body.subjectPath.split('.')[2]],
      experience: body.experience || [],
      certificates: body.certificates || [],
      achievements: body.achievements || [],
      schedule: body.schedule || [],
      teachingMethods: body.teachingMethods || '',
      history: body.history || '',
      location: body.location || '',
      teamsLink: body.teamsLink || '',
      createdAt: new Date()
    };

    await db.collection('users').updateOne(
      { gmail: body.gmail, role: 'teacher' },
      { $set: { info: teacherInfo } }
    );

    return new Response(
      JSON.stringify({
        teacherId,
        info: teacherInfo
      }),
      { status: 200 }
    );

  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Алдаа гарлаа" }),
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("id");
    const subjectPath = searchParams.get("subjectPath");

    const client = await clientPromise;
    const db = client.db();

    let query = { role: 'teacher' };
    
    if (teacherId) {
      query['info.id'] = parseInt(teacherId);
    } else if (subjectPath) {
      query['info.subjectPath'] = subjectPath;
    }

    const teachers = await db.collection('users')
      .find(query)
      .project({ password: 0 }) 
      .toArray();

    return new Response(JSON.stringify(teachers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Failed to fetch teachers" }),
      { status: 500 }
    );
  }
}