import { useEffect, useRef } from 'react';

type Axis = 'x' | 'y' | 'both';

interface Props {
  refs: React.RefObject<HTMLElement | null>[];
  axis?: Axis;
}

const useSyncScroll = ({ refs, axis = 'both' }: Props) => {
  const scrollFrame = useRef<number | null>(null);
  const isSyncing = useRef(false);
  const listeners = useRef<Map<HTMLElement, EventListener>>(new Map());

  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length < 2) return;

    const handleScroll = (source: HTMLElement) => {
      if (isSyncing.current) return;

      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
      }

      scrollFrame.current = requestAnimationFrame(() => {
        isSyncing.current = true;

        const scrollLeft = source.scrollLeft;
        const scrollTop = source.scrollTop;

        for (const el of elements) {
          if (el !== source) {
            if (axis === 'x' || axis === 'both') {
              if (el.scrollLeft !== scrollLeft) el.scrollLeft = scrollLeft;
            }
            if (axis === 'y' || axis === 'both') {
              if (el.scrollTop !== scrollTop) el.scrollTop = scrollTop;
            }
          }
        }

        isSyncing.current = false;
      });
    };

    for (const el of elements) {
      const listener = () => handleScroll(el);
      listeners.current.set(el, listener);
      el.addEventListener('scroll', listener, { passive: true });
    }

    return () => {
      for (const [el, listener] of listeners.current.entries()) {
        el.removeEventListener('scroll', listener);
      }
      listeners.current.clear();

      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
    };
  }, [refs, axis]);
};

export default useSyncScroll;
