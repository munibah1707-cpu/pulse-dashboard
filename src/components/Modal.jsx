import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

export default function Modal({ isOpen, onClose, title, children }) {
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-xl border shadow-xl"
        style={{
          backgroundColor: isDark ? "#231A2E" : "#F7F3FA",
          borderColor: isDark ? "#2E2040" : "#E8DFF5",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: isDark ? "#2E2040" : "#E8DFF5" }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: isDark ? "#F1EDF7" : "#18121E" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <IoClose size={20} color={isDark ? "#9D8FAE" : "#6B5B80"} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}