import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80 py-8 px-4 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#0B192C] flex items-center justify-center text-white">
            <Zap className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
          </div>
          <span className="font-extrabold text-[#0B192C] text-sm">AI Operations Autopilot</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-semibold">Track: AI Automation with n8n</span>
        </div>

        <p className="font-medium text-slate-600">
          “From scattered information to intelligent action.”
        </p>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Responsible Autonomous Operations • National Hackathon 2026</span>
        </div>

      </div>
    </footer>
  );
};
