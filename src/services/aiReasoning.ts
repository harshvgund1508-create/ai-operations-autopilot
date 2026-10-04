import { ScenarioItem } from '../types';
import { analyzeWithLiveLLM, analyzeWithBuiltInNeuralReasoner, getStoredAISettings } from './aiEngine';

export function analyzePromptAndGeneratePlan(promptText: string): ScenarioItem {
  // Synchronous fallback / immediate parse
  return analyzeWithBuiltInNeuralReasoner(promptText);
}

export async function analyzePromptAsync(promptText: string): Promise<ScenarioItem> {
  const settings = getStoredAISettings();
  return await analyzeWithLiveLLM(promptText, settings);
}
