import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Purchase Successful!</h1>
      <p className="mb-6">Thank you for your purchase. Your lessons have been scheduled.</p>
      <Link 
        href="/" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        go to home
      </Link>
    </div>
  );
}