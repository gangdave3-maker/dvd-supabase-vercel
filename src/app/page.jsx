import Link from "next/link";

export default function Home() {
  return (
    <div className="welcome flex flex-col min-h-screen px-4">
      {/* Title */}
      <p className="
        text-center glow italic tracking-widest
        text-2xl sm:text-3xl md:text-5xl
        font-medium
        my-8
      ">
        Pichaiyut Sirianantawong's Graduation Project
      </p>
      {/* Action area */}
      <div
        className="
          mt-auto
          flex flex-col gap-4
          sm:flex-row sm:flex-wrap
          sm:justify-center
          items-center
          pb-8
        "
      >
        <Link href="/Register" className="btn btn-outline-primary btfont glow w-full sm:w-auto text-center">
          Register
        </Link>

        <Link href="/AdminLogin" className="btn btn-outline-warning btfont glow w-full sm:w-auto text-center">
          Admin
        </Link>

        <span className="glow font-medium text-xl sm:text-2xl md:text-4xl text-center">
          Using Next.js
        </span>

        <Link href="/login" className="btn btn-outline-success btfont glow w-full sm:w-auto text-center">
          Log In
        </Link>
      </div>
    </div>
  );
}
