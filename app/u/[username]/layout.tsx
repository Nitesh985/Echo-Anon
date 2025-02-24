import Header from "@/components/u/Header";


export default function UserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }