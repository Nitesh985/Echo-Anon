import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
