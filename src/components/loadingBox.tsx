export default function LoadingBox() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      {/* باکس لودینگ */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-white/20">
        {/* انیمیشن چرخش */}
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        
        {/* متن */}
        <p className="text-sm font-bold text-slate-800 animate-pulse uppercase tracking-widest">
          Processing...
        </p>
      </div>
    </div>
  );
}