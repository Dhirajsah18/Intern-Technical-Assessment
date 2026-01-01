export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-200 to-indigo-300">
      {children}
    </div>
  );
}
