import { useEffect } from "react"

type paramsTypes = {
    element : HTMLElement, 
    onSwipeRight: Function, 
    onSwipeLeft: Function 
}

export default function useSwipe( { element, onSwipeRight, onSwipeLeft } : paramsTypes ) {

    useEffect(()=> {
      
      let touchstartX = 0
  
      const touchLength = 100;
  
      function handleTouchEnd( e : TouchEvent ) {
        const touchendX = e.changedTouches[0].clientX
        
        // Return element to its initial position 
        element.style.transform=`translate(0px)`;
        
        if (touchendX < touchstartX - touchLength) onSwipeLeft()
        if (touchendX > touchstartX + touchLength) onSwipeRight()
      }
  
      function handleTouchStart(e : TouchEvent) {
        touchstartX = e.changedTouches[0].clientX;
      }
  
      function moveElement( e: TouchEvent ) {
        const touchX = e.changedTouches[0].clientX
        element.style.transform=`translate(${ touchX - touchstartX }px)`;
      }
  
      element.addEventListener("touchmove", moveElement);
          
      element.addEventListener('touchstart', handleTouchStart);
      
      element.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        element.removeEventListener('touchstart', handleTouchStart)
        element.removeEventListener('touchend', handleTouchEnd)
        element.removeEventListener("touchmove", moveElement);
      }
  
    }, [element, onSwipeRight, onSwipeLeft])
}