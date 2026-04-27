"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import AdminAuth from "./components/AdminAuth";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPageClient() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm font-[family-name:var(--font-roboto)]">
            Verificando sesión…
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <AdminAuth />;
  return <AdminDashboard user={user} />;
}
