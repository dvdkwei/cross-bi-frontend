import { useEffect } from "react";

type useSwipeProps = {
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeDown?: () => void,
  onSwipeUp?: () => void,
}

export const Swipe = ({
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeDown, 
  onSwipeUp
}: useSwipeProps) => {
  
  useEffect(() => {
    let touchXStart: number, touchYStart: number;

    addEventListener('touchstart', (e: TouchEvent) => {
      touchXStart = e.changedTouches[0].screenX;
      touchYStart = e.changedTouches[0].screenY;
    });

    addEventListener('touchend', (e: TouchEvent) => {
      const threshold = 250;
      const offsetX = e.changedTouches[0].screenX - touchXStart;
      const offsetY = e.changedTouches[0].screenY - touchYStart;

      if(threshold > Math.abs(offsetX) && threshold > Math.abs(offsetY)) return;

      if(touchXStart && offsetX < 0 && onSwipeRight) onSwipeRight();
      if(touchXStart && offsetX > 0 && onSwipeLeft) onSwipeLeft();
      if(touchXStart && offsetY > 0 && onSwipeDown) onSwipeDown();
      if(touchXStart && offsetY > 0 && onSwipeUp) onSwipeUp();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}