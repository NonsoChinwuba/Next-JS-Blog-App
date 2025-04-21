import Link from "next/link";



export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen mt-25">
      <h1 className="font-bold" >This Page can't be found</h1>
      <Link href={'/'}>Go back to homepage</Link>
    </div>
  );
}
