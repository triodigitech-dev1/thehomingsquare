const fs = require('fs');
const path = require('path');

// Read the already generated CURRICULUM_CHAPTERS from curriculum.ts
const content = fs.readFileSync('src/data/curriculum.ts', 'utf-8');
const equalIdx = content.indexOf('= [');
const jsonStart = equalIdx + 2;
const jsonEnd = content.lastIndexOf('];');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);
const chapters = JSON.parse(jsonStr);

const baseDir = path.resolve('src/data/curriculum');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const CHAPTER_DIR_MAP = {
  ch_p: { dir: 'prerequisite', exportName: 'prerequisiteChapter' },
  ch_1: { dir: 'chapter-1', exportName: 'chapter1' },
  ch_2: { dir: 'chapter-2', exportName: 'chapter2' },
  ch_3: { dir: 'chapter-3', exportName: 'chapter3' },
  ch_4: { dir: 'chapter-4', exportName: 'chapter4' },
  ch_5: { dir: 'chapter-5', exportName: 'chapter5' },
  ch_6: { dir: 'chapter-6', exportName: 'chapter6' },
  ch_7: { dir: 'chapter-7', exportName: 'chapter7' },
  ch_8: { dir: 'chapter-8', exportName: 'chapter8' },
  ch_app: { dir: 'appendix', exportName: 'appendixChapter' }
};

const indexChapterImports = [];
const indexChapterExports = [];

for (const ch of chapters) {
  const meta = CHAPTER_DIR_MAP[ch.id];
  const chDir = path.join(baseDir, meta.dir);
  if (!fs.existsSync(chDir)) {
    fs.mkdirSync(chDir, { recursive: true });
  }

  const unitImports = [];
  const unitVarNames = [];

  for (const unit of ch.units) {
    const unitSlug = 'unit-' + unit.unitCode.toLowerCase().replace('.', '-');
    const unitVarName = 'unit' + unit.unitCode.replace('.', '_').replace('-', '_');
    const unitFilePath = path.join(chDir, `${unitSlug}.ts`);

    const unitFileContent = `/**
 * Official Curriculum Unit: ${unit.unitCode} — ${unit.title}
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const ${unitVarName}: CurriculumUnit = ${JSON.stringify(unit, null, 2)};
`;

    fs.writeFileSync(unitFilePath, unitFileContent, 'utf-8');

    unitImports.push(`import { ${unitVarName} } from './${unitSlug}';`);
    unitVarNames.push(unitVarName);
  }

  // Chapter index file
  const chMetaWithoutUnits = {
    id: ch.id,
    number: ch.number,
    code: ch.code,
    title: ch.title,
    subtitle: ch.subtitle,
    description: ch.description
  };

  const chIndexContent = `/**
 * Chapter Index: ${ch.code} — ${ch.title}
 */

import { CurriculumChapter } from '../../../types/chess';
${unitImports.join('\n')}

export const ${meta.exportName}: CurriculumChapter = {
${Object.entries(chMetaWithoutUnits).map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join('\n')}
  units: [
    ${unitVarNames.join(',\n    ')}
  ]
};
`;

  fs.writeFileSync(path.join(chDir, 'index.ts'), chIndexContent, 'utf-8');

  indexChapterImports.push(`import { ${meta.exportName} } from './${meta.dir}';`);
  indexChapterExports.push(meta.exportName);
}

// Master curriculum index
const masterIndexContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Master Curriculum Aggregator
 * Structured modularly: Chapter directories -> Unit concept files -> Chapter index
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumChapter } from '../../types/chess';
${indexChapterImports.join('\n')}

export const CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  ${indexChapterExports.join(',\n  ')}
];

export {
  ${indexChapterExports.join(',\n  ')}
};
`;

fs.writeFileSync(path.join(baseDir, 'index.ts'), masterIndexContent, 'utf-8');

// Update src/data/curriculum.ts to re-export from modular hierarchy
const curriculumTsContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Official Master Curriculum for The Homing Square
 * Re-exports from modular data architecture in src/data/curriculum/
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

export { CURRICULUM_CHAPTERS } from './curriculum/index';
export type { CurriculumChapter, CurriculumUnit } from '../types/chess';
`;

fs.writeFileSync('src/data/curriculum.ts', curriculumTsContent, 'utf-8');

console.log('Successfully generated modular curriculum folders, units, and index files!');
