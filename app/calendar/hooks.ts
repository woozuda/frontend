import { isNil } from "ramda";
import { useEffect, useRef, useState } from "react";

const useCalendarToggle = () => {
  const ref = useRef(null as HTMLDivElement | null);
  const touchStartRef = useRef(0);
  const mouseDownRef = useRef<number | undefined>();
  const [isTouchMoved, setIsTouchMoved] = useState(false);

  useEffect(() => {
    if (isTouchMoved) {
      return;
    }
    const element = ref.current;
    const onTouchMove = function (event: TouchEvent) {
      const targetY = event.touches[0].clientY;
      if (targetY - touchStartRef.current > 10) {
        setIsTouchMoved(true);
      }
    };
    const onTouchStart = function (event: TouchEvent) {
      touchStartRef.current = event.touches[0].clientY;
    };
    element?.addEventListener("touchmove", onTouchMove);
    element?.addEventListener("touchstart", onTouchStart);
    return () => {
      element?.removeEventListener("touchmove", onTouchMove);
      element?.removeEventListener("touchstart", onTouchStart);
    };
  }, [isTouchMoved]);

  useEffect(() => {
    if (!isTouchMoved) {
      return;
    }
    const element = ref.current;
    const onTouchMove = function (event: TouchEvent) {
      const targetY = event.touches[0].clientY;
      if (targetY - touchStartRef.current < -10) {
        setIsTouchMoved(false);
      }
    };
    const onTouchStart = function (event: TouchEvent) {
      touchStartRef.current = event.touches[0].clientY;
    };
    element?.addEventListener("touchmove", onTouchMove);
    element?.addEventListener("touchstart", onTouchStart);
    return () => {
      element?.removeEventListener("touchmove", onTouchMove);
      element?.removeEventListener("touchstart", onTouchStart);
    };
  }, [isTouchMoved]);

  useEffect(() => {
    if (isTouchMoved) {
      return;
    }
    const element = ref.current;
    const onMouseMove = function (event: MouseEvent) {
      if (isNil(mouseDownRef.current)) {
        return;
      }
      const targetY = event.clientY;
      if (targetY - mouseDownRef.current > 10) {
        setIsTouchMoved(true);
      }
    };
    const onMouseDown = function (event: MouseEvent) {
      mouseDownRef.current = event.clientY;
    };
    const onMouseUp = () => {
      mouseDownRef.current = undefined;
    };
    element?.addEventListener("mousemove", onMouseMove);
    element?.addEventListener("mousedown", onMouseDown);
    element?.addEventListener("mouseup", onMouseUp);
    return () => {
      element?.removeEventListener("mousemove", onMouseMove);
      element?.removeEventListener("mousedown", onMouseDown);
      element?.removeEventListener("mouseup", onMouseUp);
    };
  }, [isTouchMoved]);

  useEffect(() => {
    if (!isTouchMoved) {
      return;
    }
    const element = ref.current;
    const onMouseMove = function (event: MouseEvent) {
      if (isNil(mouseDownRef.current)) {
        return;
      }
      const targetY = event.clientY;
      if (targetY - mouseDownRef.current < -10) {
        setIsTouchMoved(false);
      }
    };
    const onMouseDown = function (event: MouseEvent) {
      mouseDownRef.current = event.clientY;
    };
    const onMouseUp = () => {
      mouseDownRef.current = undefined;
    };
    element?.addEventListener("mousemove", onMouseMove);
    element?.addEventListener("mousedown", onMouseDown);
    element?.addEventListener("mouseup", onMouseUp);
    return () => {
      element?.removeEventListener("mousemove", onMouseMove);
      element?.removeEventListener("mousedown", onMouseDown);
      element?.removeEventListener("mouseup", onMouseUp);
    };
  }, [isTouchMoved]);

  return {
    ref,
    isTouchMoved,
  };
};

export default useCalendarToggle;
