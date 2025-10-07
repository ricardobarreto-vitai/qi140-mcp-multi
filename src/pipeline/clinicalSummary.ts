import fs from 'fs/promises';
import path from 'path';
import type { LLMClient } from '../llm/provider.js';

export async function generateSummary(
  client: LLMClient,
  model: string,
  promptFile: string,
  inputJson: any
): Promise<{ summary: string; promptSnapshot: string }> {
  const promptPath = path.resolve(promptFile);
  const promptSnapshot = await fs.readFile(promptPath, 'utf8');

  const userContent = [
    'A seguir está o JSON do atendimento. Gere o resumo clínico conforme as instruções do sistema.',
    '',
    'JSON:',
    '```json',
    JSON.stringify(inputJson, null, 2),
    '```'
  ].join('\n');

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: promptSnapshot },
      { role: 'user', content: userContent }
    ],
    temperature: 0.2
  });

  const summary = completion.choices?.[0]?.message?.content?.trim() || '';
  return { summary, promptSnapshot };
}