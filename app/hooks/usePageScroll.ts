import throttle from "lodash.throttle";
import { useEffect, useRef } from "react";

export interface UsePageScrollProps {
  throttleWait?: number;
  headerHeight?: number;

  onScrolled?: (event: Event) => unknown;
  onNotScrolled?: (event: Event) => unknown;
}

const usePageScroll = <E1 extends HTMLElement, E2 extends HTMLElement>(
  props: UsePageScrollProps
) => {
  const {
    throttleWait = 1000 * 0.1,
    headerHeight = 56,
    onScrolled,
    onNotScrolled,
  } = props;
  const scrollRef = useRef(null as E1 | null);
  const rectRef = useRef(null as E2 | null);

  useEffect(() => {
    function onScroll(event: Event) {
      const rect = rectRef.current?.getBoundingClientRect();
      if (rect && rect.top === headerHeight) {
        onNotScrolled?.(event);
      } else {
        onScrolled?.(event);
      }
    }
    const onScrollThrottled = throttle(onScroll, throttleWait);

    scrollRef.current?.addEventListener("scroll", onScrollThrottled);

    return () => {
      scrollRef.current?.removeEventListener("scroll", onScrollThrottled);
    };
  }, [throttleWait, headerHeight, onScrolled, onNotScrolled]);

  return {
    rectRef,
    scrollRef,
  };
};

export default usePageScroll;
