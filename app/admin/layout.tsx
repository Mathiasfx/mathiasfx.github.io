import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Mathias Pereira",
  description: "Panel de administración del blog",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {children}
    </div>
  );
}
