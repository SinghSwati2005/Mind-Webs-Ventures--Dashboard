import { create } from 'zustand';

interface TimelineRange {
  start: string;
  end: string;
}

interface TimelineState {
  selectedRange: TimelineRange;
  setSelectedRange: (range: TimelineRange) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  selectedRange: { start: '2025-07-18', end: '2025-08-01' },
  setSelectedRange: (range) => set({ selectedRange: range }),
}));
