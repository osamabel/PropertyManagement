
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBar />
      <main className="overflow-hidden w-full relative flex flex-col items-center gap-[10px] p-[20px]">
        <Header />
        <img
          className="absolute w-[80%] right-[-20%] opacity-[.07] z-[1]"
          src="/logo.svg"
          alt="logo"
        />
        {children}
      </main>
    </div>
  );
}
