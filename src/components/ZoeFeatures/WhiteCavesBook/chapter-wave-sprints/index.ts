import type { ChapterNode } from '../treeTypes';
import { CHAPTER_WAVE_SPRINTS_PART_01 } from './part-01.data';
import { CHAPTER_WAVE_SPRINTS_PART_02 } from './part-02.data';
import { CHAPTER_WAVE_SPRINTS_PART_03 } from './part-03.data';
import { CHAPTER_WAVE_SPRINTS_PART_04 } from './part-04.data';

export const CHAPTER_WAVE_SPRINTS: ChapterNode = {
  ...{
  "level": 5,
  "nodeId": "CH05-WAVE-SPRINTS",
  "chapterNumber": 34,
  "chapterCode": "CH-34-WAVE-SPRINTS",
  "title": "Chapter 34: Wave Sprints & SQA Delivery Tracks",
  "subtitle": "Autonomous wave iterations, security hardening, and test suites",
  "readTimeMinutes": 48,
  "overviewMarkdown": "This chapter provides real-time and historical telemetry for autonomous engineering wave sprints executed across the White Caves monorepo. It details daily milestones managed by @Margaret, SQA verification gates run by @Rachel_QA, and continuous security hardening under AEG-018 through AEG-025. Compare sprint outcomes against the overarching roadmap in [Strategic Plans](CH05-STRAT-PLANS), study previous architectural migrations in [Phase History](CH05-PHASE-EXEC), and review constitutional engineering constraints in the [Protocol Canon](CH05-PROTOCOLS)."
},
  subChapters: [
    ...CHAPTER_WAVE_SPRINTS_PART_01,
    ...CHAPTER_WAVE_SPRINTS_PART_02,
    ...CHAPTER_WAVE_SPRINTS_PART_03,
    ...CHAPTER_WAVE_SPRINTS_PART_04,
  ],
};
