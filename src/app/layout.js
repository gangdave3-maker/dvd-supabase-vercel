import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

export const metadata = {
  title: {
    default: 'Movie Rent | Best Graduation Movie Project | Pichaiyut Sirianantawong',
    template: '%s | Movie Rent', // Automatically turns "Batman" into "Batman | MovieRent"
  },
  description: 'Rent the latest blockbusters and classic films online. Fast, easy, and affordable.',
  metadataBase: new URL('https://your-domain.com'), // Replace with your real domain
  openGraph: {
    title: 'Movie Rent Shop',
    description: 'The best movie rental experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} antialiased lay`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
