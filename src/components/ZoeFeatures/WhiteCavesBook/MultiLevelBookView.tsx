// src/components/ZoeFeatures/WhiteCavesBook/MultiLevelBookView.tsx
import React, { useMemo, useState } from 'react';
import { useMultiLevelBook } from './MultiLevelBookContext';
import { AEGIS_12_LEVEL_CORPUS } from './masterLibraryData';
import { search12LevelTree } from './treeQueryEngine';
import { getNodePreviewData } from './previewHelper';
import { HoveredTarget } from './multiLevelBookView/types';
import { renderRichHypertextContent } from './multiLevelBookView/richHypertext';
import { BookHeaderStrip } from './multiLevelBookView/BookHeaderStrip';
import { VolumeCantoStrip } from './multiLevelBookView/VolumeCantoStrip';
import { StructureMeshSidebar } from './multiLevelBookView/StructureMeshSidebar';
import { BreadcrumbBar } from './multiLevelBookView/BreadcrumbBar';
import { ArtifactDetailView } from './multiLevelBookView/ArtifactDetailView';
import { ChapterOverviewView } from './multiLevelBookView/ChapterOverviewView';
import { HoverPreviewTooltip } from './multiLevelBookView/HoverPreviewTooltip';

export const MultiLevelBookView: React.FC = () => {
  const {
    corpus,
    currentLibrary,
    currentBook,
    currentVolume,
    currentCanto,
    currentChapter,
    currentSubChapter,
    currentSection,
    currentTopic,
    currentArtifact,
    currentParagraph,
    currentSentence,
    currentLine,
    activeLevel,
    breadcrumbs,
    searchQuery,
    setSearchQuery,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    selectBook,
    selectVolume,
    selectCanto,
    selectChapter,
    selectSubChapter,
    selectSection,
    selectTopic,
    selectArtifact,
    selectParagraph,
    selectSentence,
    selectLine,
    navigateToNodeId,
    returnUpOneLevel,
    resetToChapter,
  } = useMultiLevelBook();

  const [hoveredTarget, setHoveredTarget] = useState<HoveredTarget | null>(null);

  const handleMouseEnterLink = (e: React.MouseEvent, targetId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const data = getNodePreviewData(corpus, targetId);
    if (data) {
      setHoveredTarget({
        targetId,
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
        data,
      });
    }
  };

  const handleMouseLeaveLink = () => {
    setHoveredTarget(null);
  };

  const searchResults = useMemo(() => {
    return search12LevelTree(AEGIS_12_LEVEL_CORPUS, searchQuery, 15);
  }, [searchQuery]);

  const renderRichHypertext = (text: string) =>
    renderRichHypertextContent(text, {
      onNavigate: targetId => {
        setHoveredTarget(null);
        navigateToNodeId(targetId);
      },
      onMouseEnterLink: handleMouseEnterLink,
      onMouseLeaveLink: handleMouseLeaveLink,
    });

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] text-slate-100 rounded-xl border border-sky-500/20 overflow-hidden shadow-2xl">
      {/* ── Level 0 & 1: Master Header Strip ── */}
      <BookHeaderStrip
        activeLevel={activeLevel}
        currentLibrary={currentLibrary}
        currentBook={currentBook}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        selectBook={selectBook}
      />

      {/* ── Level 3 & 4: Volume & Canto Horizontal Selection Strip ── */}
      <VolumeCantoStrip
        currentBook={currentBook}
        currentVolume={currentVolume}
        currentCanto={currentCanto}
        selectVolume={selectVolume}
        selectCanto={selectCanto}
      />

      {/* ── Main Viewport Split: 12-Level Vertical Navigator vs Deep Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Structure Accordion (Level 5 to Level 12) */}
        <StructureMeshSidebar
          currentCanto={currentCanto}
          currentChapter={currentChapter}
          currentSubChapter={currentSubChapter}
          currentSection={currentSection}
          currentTopic={currentTopic}
          currentArtifact={currentArtifact}
          selectChapter={selectChapter}
          selectSubChapter={selectSubChapter}
          selectSection={selectSection}
          selectTopic={selectTopic}
          selectArtifact={selectArtifact}
        />

        {/* Right Viewport: Complete 12-Level Drilldown Display */}
        <div className="flex-1 flex flex-col bg-[#050B17] overflow-hidden">
          <BreadcrumbBar
            activeLevel={activeLevel}
            breadcrumbs={breadcrumbs}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            goBack={goBack}
            goForward={goForward}
            returnUpOneLevel={returnUpOneLevel}
            resetToChapter={resetToChapter}
          />

          {/* Deep Level Presentation Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl">
            {currentArtifact ? (
              <ArtifactDetailView
                currentArtifact={currentArtifact}
                currentParagraph={currentParagraph}
                currentSentence={currentSentence}
                currentLine={currentLine}
                selectParagraph={selectParagraph}
                selectSentence={selectSentence}
                selectLine={selectLine}
                renderRichHypertext={renderRichHypertext}
              />
            ) : (
              <ChapterOverviewView
                currentChapter={currentChapter}
                selectSubChapter={selectSubChapter}
                selectSection={selectSection}
                renderRichHypertext={renderRichHypertext}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Hover Preview Card Tooltip */}
      {hoveredTarget && <HoverPreviewTooltip hoveredTarget={hoveredTarget} />}
    </div>
  );
};
