"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { FcGoogle } from "react-icons/fc";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function AdminAuth() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (adminEmail && result.user.email !== adminEmail) {
        await auth.signOut();
        setError(
          `Acceso denegado. Solo la cuenta ${adminEmail} puede ingresar.`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Glow background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-600/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-sm shadow-2xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center">
              <RiShieldKeyholeLine className="w-8 h-8 text-teal-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white mb-1">
            Panel Admin
          </h1>
          <p className="text-center font-[family-name:var(--font-roboto)] text-sm text-slate-400 mb-8">
            Mathias Pereira — Blog Management
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-700/60" />
            <span className="text-xs text-slate-500 font-[family-name:var(--font-roboto)]">
              Acceso restringido
            </span>
            <div className="flex-1 h-px bg-slate-700/60" />
          </div>

          {/* Google Button */}
          <button
            id="admin-google-login-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-600/70 bg-slate-800/80 hover:bg-slate-700/80 hover:border-slate-500/70 transition-all duration-200 text-white font-[family-name:var(--font-roboto)] font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
            ) : (
              <FcGoogle className="w-5 h-5 shrink-0" />
            )}
            <span>{loading ? "Conectando…" : "Continuar con Google"}</span>
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-[family-name:var(--font-roboto)] text-center">
              {error}
            </div>
          )}

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-slate-600 font-[family-name:var(--font-roboto)]">
            Solo cuentas autorizadas pueden acceder al panel.
          </p>
        </div>

        {/* Bottom link */}
        <p className="text-center mt-4 text-xs text-slate-600">
          <a
            href="/"
            className="hover:text-slate-400 transition-colors duration-150"
          >
            ← Volver al sitio
          </a>
        </p>
      </div>
    </div>
  );
}
