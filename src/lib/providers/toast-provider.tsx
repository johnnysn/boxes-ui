import React, { useState, useCallback } from "react";
import { ToastContext, type ToastType } from "./toast-context";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    id: number;
  } | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, id: Date.now() });

    // Auto-close after 3 seconds
    setTimeout(() => {
      setToast((current) =>
        current && current.message === message ? null : current
      );
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded shadow-lg transition-all animate-in fade-in slide-in-from-bottom-5 ${
            toast.type === "error"
              ? "bg-red-100 border border-red-400 text-red-700"
              : "bg-green-100 border border-green-400 text-green-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {toast.type === "error" ? "Error!" : "Success!"}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
