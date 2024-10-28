import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <span className="text-black font-bold text-2xl">Installment</span>
      <span className="text-yellow-400 font-black text-2xl">Cart</span>
    </Link>
  );
}
