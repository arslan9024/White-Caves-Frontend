export interface TourInteractionState {
  rotation: { x: number; y: number };
  zoom: number;
  isDragging: boolean;
  startPos: { x: number; y: number };
}

export type TourAction =
  | { type: 'START_DRAG'; payload: { x: number; y: number } }
  | { type: 'DRAG_MOVE'; payload: { clientX: number; clientY: number } }
  | { type: 'STOP_DRAG' }
  | { type: 'AUTO_ROTATE' }
  | { type: 'ZOOM'; payload: number }
  | { type: 'ZOOM_DELTA'; payload: number }
  | { type: 'RESET_VIEW' }
  | { type: 'SET_ROTATION'; payload: { x: number; y: number } };

export function tourReducer(state: TourInteractionState, action: TourAction): TourInteractionState {
  switch (action.type) {
    case 'START_DRAG':
      return { ...state, isDragging: true, startPos: action.payload };
    case 'DRAG_MOVE': {
      if (!state.isDragging) return state;
      const deltaX = action.payload.clientX - state.startPos.x;
      const deltaY = action.payload.clientY - state.startPos.y;
      return {
        ...state,
        rotation: {
          x: Math.max(-85, Math.min(85, state.rotation.x - deltaY * 0.3)),
          y: state.rotation.y + deltaX * 0.3,
        },
        startPos: { x: action.payload.clientX, y: action.payload.clientY },
      };
    }
    case 'STOP_DRAG':
      return { ...state, isDragging: false };
    case 'AUTO_ROTATE':
      return { ...state, rotation: { ...state.rotation, y: state.rotation.y + 0.5 } };
    case 'ZOOM':
      return { ...state, zoom: Math.max(0.5, Math.min(3, action.payload)) };
    case 'ZOOM_DELTA':
      return { ...state, zoom: Math.max(0.5, Math.min(3, state.zoom + action.payload)) };
    case 'RESET_VIEW':
      return { ...state, rotation: { x: 0, y: 0 }, zoom: 1 };
    case 'SET_ROTATION':
      return { ...state, rotation: action.payload };
    default:
      return state;
  }
}

export interface TourImage {
  url?: string;
  title?: string;
  name?: string;
  thumbnail?: string;
  hotspots?: TourHotspotData[];
  [key: string]: unknown;
}

export interface TourHotspotData {
  id?: string;
  x: number;
  y: number;
  label?: string;
  icon?: string;
  type?: 'info' | 'navigation';
  targetRoom?: number;
  action?: () => void;
}

export interface VirtualTourProps {
  images?: TourImage[];
  initialIndex?: number;
  onClose?: () => void;
  propertyTitle?: string;
}
