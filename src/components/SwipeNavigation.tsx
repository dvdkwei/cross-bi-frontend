import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type useSwipeNavigationProps = {
  onSwipeLeftRoute?: string,
  onSwipeRightRoute?: string,
  onSwipeDownRoute?: string,
  onSwipeUpRoute?: string,
}

export const SwipeNavigation = ({
  onSwipeLeftRoute,
  onSwipeRightRoute,
  onSwipeDownRoute,
  onSwipeUpRoute
}: useSwipeNavigationProps) => {
  const navigate = useNavigate();

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

      if (threshold > Math.abs(offsetX) && threshold > Math.abs(offsetY)) return;

      if (touchXStart) {
        if (offsetX < 0 && onSwipeRightRoute) {
          navigate(onSwipeRightRoute, { state: { transition: 'page-transition-right' } });
        }
        else if (offsetX > 0 && onSwipeLeftRoute) {
          navigate(onSwipeLeftRoute, { state: { transition: 'page-transition-left' } })
        }
        return;
      }

      if (touchYStart) {
        if (offsetY > 0 && onSwipeDownRoute) {
          navigate(onSwipeDownRoute, { state: { transition: 'page-transition-down' } });
        }
        else if (offsetY > 0 && onSwipeUpRoute) { 
          navigate(onSwipeUpRoute, { state: { transition: 'page-transition-up' } });
        }
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}