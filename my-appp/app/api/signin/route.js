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
  