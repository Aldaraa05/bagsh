export async function GET( Request) {
    // For example, fetch data from your DB here
    const users = [
        { id: 1, name: 'Alice', surname: 'Bat', gmail: 'alice.bat@gmail.com', number: '99990001', password: 'pass1234' },
        { id: 2, name: 'Bob', surname: 'Bold', gmail: 'bob.bold@gmail.com', number: '99990002', password: 'qwerty78' },
        { id: 3, name: 'Carol', surname: 'Chinbat', gmail: 'carol.chinbat@gmail.com', number: '99990003', password: 'carol567' },
        { id: 4, name: 'David', surname: 'Dorj', gmail: 'david.dorj@gmail.com', number: '99990004', password: 'dav12345' }
      ];
      
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  export async function POST(Request) {
    // Parse the request body
    const body = await Request.json();
    const { name } = body;
    const { surname } = body;
    const { gmail } = body;
    const { number } = body;
    const { password } = body;
    // e.g. Insert new user into your DB
    const newUser = { id: Date.now(), name, surname, gmail, number, password };
   
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }