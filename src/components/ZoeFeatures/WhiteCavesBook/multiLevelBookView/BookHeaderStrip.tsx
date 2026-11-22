// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookView/BookHeaderStrip.tsx
import React from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { BookNode, ProjectLibraryNode } from '../treeTypes';
import { SearchMatch } from '../treeQueryEngine';

interface BookHeaderStripProps {
  activeLevel: number;
  currentLibrary: ProjectLibraryNode;
  currentBook: BookNode;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: SearchMatch[];
  selectBook: (bookId: string) => void;
}

export const BookHeaderStrip: React.FC<BookHeaderStripProps> = ({
  activeLevel,
  currentLibrary,
  currentBook,
  searchQuery,
  setSearchQuery,
  searchResults,
  selectBook,
}) => {
  return (
    <div className="px-5 py-3 bg-slate-900/90 border-b border-sky-500/20 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
              Level {activeLevel} / 12
            </span>
            <span className="text-slate-600">|</span>
            <h1 className="font-bold text-sm tracking-wide text-white">{currentBook.title}</h1>
          </div>
          <p className="text-[11px] text-slate-400">{currentBook.subtitle}</p>
        </div>

        {/* Book Switcher Tabs: 1. White Caves (Project & Brokerage) | 2. AEGIS (Autonomous Multi-Agent AI Engine) */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 ml-4">
          {currentLibrary.books.map(b => {
            const isSelected = b.bookId === currentBook.bookId;
            return (
              <button
                key={b.bookId}
                onClick={() => selectBook(b.bookId)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-slate-600'}`}
                ></span>
                <span>
                  {b.bookNumber === 1
                    ? 'Book 1: White Caves Real Estate'
                    : 'Book 2: AEGIS Autonomous Engine'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global 12-Level Omni-Search */}
      <div className="relative w-80">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search lines, sentences, artifacts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-7 py-1 text-xs bg-slate-950/80 border border-slate-700/60 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Omni-Search Live Dropdown */}
        {searchQuery.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-9 bg-slate-900 border border-sky-500/30 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto divide-y divide-slate-800">
            <div className="px-3 py-1.5 bg-slate-950 text-[10px] text-slate-400 font-mono uppercase flex justify-between">
              <span>{searchResults.length} Matches Found</span>
              <span>Sub-60-Token Coordinates</span>
            </div>
            {searchResults.length === 0 ? (
              <div className="p-3 text-xs text-slate-500 text-center">
                No nodes matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              searchResults.map(match => (
                <button
                  key={match.nodeId}
                  onClick={() => {
                    selectBook(match.bookId);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2.5 hover:bg-slate-800/80 transition flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-sky-400 font-semibold uppercase bg-sky-950/60 border border-sky-800/40 px-1.5 py-0.5 rounded">
                      L{match.level}: {match.levelName}
                    </span>
                    <span className="text-slate-500 text-[10px]">{match.bookTitle}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                    {match.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 italic">
                    &quot;{match.snippet}&quot;
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
