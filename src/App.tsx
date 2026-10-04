import React, { useState } from 'react';
import { NavigationTab, ScenarioItem } from './types';
import { SCENARIOS_DATA } from './data/autopilotData';
import { analyzePromptAndGeneratePlan } from './services/aiReasoning';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { AutopilotRoom } from './components/autopilot/AutopilotRoom';
import { ScenariosPage } from './components/scenarios/ScenariosPage';
import { ArchitecturePage } from './components/architecture/ArchitecturePage';
import { AuditTrailPage } from './components/audit/AuditTrailPage';
import { DemoWizardModal } from './components/demo/DemoWizardModal';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [promptInput, setPromptInput] = useState<string>(
    "Customer says their ₹18,500 order hasn't arrived and they need it for a wedding tomorrow. They already contacted support twice."
  );
  const [activeScenario, setActiveScenario] = useState<ScenarioItem>(SCENARIOS_DATA[0]);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  const handleAnalyzeAndAutomate = () => {
    const text = promptInput.trim() || SCENARIOS_DATA[0].promptText;
    const generatedScenario = analyzePromptAndGeneratePlan(text);
    setActiveScenario(generatedScenario);
    setCurrentTab('autopilot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScenario = (scenario: ScenarioItem) => {
    setActiveScenario(scenario);
    setPromptInput(scenario.promptText);
    setCurrentTab('autopilot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTimelineFromDashboard = (scenario: ScenarioItem) => {
    setActiveScenario(scenario);
    setCurrentTab('autopilot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToHome = () => {
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Global Header with 6 Navigation Tabs */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartDemo={() => setIsDemoModalOpen(true)}
        isLiveMode={isLiveMode}
        onToggleLiveMode={setIsLiveMode}
      />

      {/* Main View Area based on active Navigation Tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-12">
        {currentTab === 'home' && (
          <HomePage
            promptInput={promptInput}
            onChangePrompt={setPromptInput}
            onAnalyzeAndAutomate={handleAnalyzeAndAutomate}
            onSelectScenario={handleSelectScenario}
            onStartDemo={() => setIsDemoModalOpen(true)}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onOpenScenarioTimeline={handleOpenTimelineFromDashboard}
          />
        )}

        {currentTab === 'autopilot' && (
          <AutopilotRoom
            scenario={activeScenario}
            onResetToHome={handleResetToHome}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReanalyzePrompt={(customText) => {
              setPromptInput(customText);
              const generated = analyzePromptAndGeneratePlan(customText);
              setActiveScenario(generated);
            }}
            onUpdateScenario={(newScenario, newText) => {
              setPromptInput(newText);
              setActiveScenario(newScenario);
            }}
          />
        )}

        {currentTab === 'scenarios' && (
          <ScenariosPage
            onSelectScenario={handleSelectScenario}
          />
        )}

        {currentTab === 'architecture' && (
          <ArchitecturePage />
        )}

        {currentTab === 'audit' && (
          <AuditTrailPage />
        )}
      </main>

      {/* 3-Minute Live Hackathon Demo Walkthrough Modal */}
      <DemoWizardModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
