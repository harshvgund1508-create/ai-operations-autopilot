import React from 'react';
import { Package, UserCheck, GraduationCap, Store, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { SCENARIOS_DATA } from '../../data/autopilotData';
import { ScenarioItem } from '../../types';

interface ScenariosPageProps {
  onSelectScenario: (scenario: ScenarioItem) => void;
}

export const ScenariosPage: React.FC<ScenariosPageProps> = ({ onSelectScenario }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return Package;
      case 'UserCheck': return UserCheck;
      case 'GraduationCap': return GraduationCap;
      case 'Store': return Store;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          Cross-Domain Operational Engine
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
          Real-World Scenarios
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          The same underlying AI decision layer and n8n execution architecture dynamically powers customer support, HR, education, and finance.
        </p>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCENARIOS_DATA.map((sc) => {
          const Icon = getIcon(sc.icon);
          return (
            <div
              key={sc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-subtle hover:border-sky-300 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {sc.category}
                      </span>
                      <h3 className="text-base font-black text-[#0B192C]">{sc.title}</h3>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {sc.resultSummary.timeSavedMinutes} min saved
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 italic leading-relaxed">
                  “{sc.promptText}”
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Classified Intent:</span>
                    <strong className="text-[#0B192C]">{sc.extractedContext.intentLabel}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Priority & Risk:</span>
                    <span className="font-bold text-amber-600">{sc.extractedContext.priority} ({sc.extractedContext.risk} Risk)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">AI Confidence:</span>
                    <span className="font-bold text-emerald-600">{sc.extractedContext.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {sc.actionPlan.length} Dynamic Actions
                </span>

                <button
                  onClick={() => onSelectScenario(sc)}
                  className="px-4 py-2 rounded-xl bg-[#0B192C] hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Try Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
