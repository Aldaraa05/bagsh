import Image from "next/image";

export default function QRPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-semibold mb-4">Сканнердах QR код</h1>
      <Image 
        src="/zurag/qrr.png" 
        alt="QR код зураг" 
        width={300} 
        height={300} 
        priority 
      />
    </main>
  );
}
