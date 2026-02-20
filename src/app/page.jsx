import Link from "next/link";

export default function Home() {
  return (
    <div className="welcome flex flex-col">
      <p className="text-center glow text-5xl font-medium italic tracking-widest vspace">
        Pichaiyut Sirianantawong's Graduation Project
      </p>
      <div className="flex! justify-around! items-center fpb mt-auto">
        <button className="btn btn-outline-primary"><Link href={'/Register'} className="btfont glow">Register</Link></button>
        <button className="btn btn-outline-warning"><Link href={'/AdminLogin'} className="btfont glow">Admin</Link></button>
        <span className="glow text-4xl font-medium">Using Next.JS</span>
        <button className="btn btn-outline-success"><Link href={'/login'} className="btfont glow">Log In</Link></button>
      </div>
    </div>
  );
}
