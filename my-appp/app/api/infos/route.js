import clientPromise from "@/app/lib/mongodb";

// Helper function to generate teacher ID
async function generateTeacherId(db, subjectPath) {
  const [mainCategory, subcategory, specificSubject] = subjectPath.split('.');
  
  // Define category bases
  const categoryBases = {
    'Baigaliin_uhaan': 100000,
    'IT': 200000,
    'Sport': 300000,
    'Niigmiin_uhaan': 400000,
    'Humuunlegiin_uhaan': 500000,
    'Business': 600000
  };

  // Define subcategory offsets
  const subcategoryOffsets = {
    'fizik': 10000,
    'Himi': 20000,
    'Biology': 30000,
    'Math': 40000,
    'Astronomi': 50000,
    'Programchlal': 10000,
    'UgugdliinSan': 20000,
    'Cybersecurity': 30000,
    // Add other subcategories as needed
  };

  // Define subject offsets
  const subjectOffsets = {
    'klassik_fizik': 1000,
    'kvant_fizik': 2000,
    'atom_fizik': 3000,
    'elektronik': 4000,
    'organik_himi': 1000,
    'analitik_himi': 2000,
    // Add other subjects as needed
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

    // Required fields
    if (!body.gmail || !body.subjectPath) {
      return new Response(
        JSON.stringify({ error: "Gmail and subjectPath are required" }),
        { status: 400 }
      );
    }

    // Generate teacher ID
    const teacherId = await generateTeacherId(db, body.subjectPath);

    // Prepare teacher info
    const teacherInfo = {
      id: teacherId,
      subjectPath: body.subjectPath,
      subjects: [body.subjectPath.split('.')[2]], // specific subject
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

    // Update teacher document
    const result = await db.collection('users').updateOne(
      { gmail: body.gmail, role: 'teacher' },
      { $set: { info: teacherInfo } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Teacher not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Teacher info updated successfully",
        teacherId: teacherId,
        info: teacherInfo
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Failed to update teacher info" }),
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
      .project({ password: 0 }) // Exclude password
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