import { useRef, useEffect, useState } from 'react';

// hooks
import useDragger from '@/hooks/builder/useDragger';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';

// utils
import { setCanvasZoom } from '@/utils/canvas/utils';
import { addPositionTagToElement } from '@/utils/canvas/debug';
import { detectCanvasOutOfBounds } from '@/utils/canvas/bounds';
import { useAppDispatch, useAppSelector } from '@/utils/index';

// store
import { canBeDragged as canBeDraggedStore, zoomLevel, setZoomLevel } from '@/store/slices/canvas';
import { website } from '@/store/slices/website-store';
import { device } from '@/store/slices/index';

// framer motion
import SiteBuilderCanvasHotbar from '@/components/website/builder/hotbar';

export default function SiteBuilderCanvas() {
  const dispatch = useAppDispatch();

  const canvasContainer = useRef<HTMLDivElement>(null);
  const currentDevice = useAppSelector(device);
  const canvasContainerWrapper = useRef<HTMLDivElement>(null);
  const canBeDragged = useAppSelector(canBeDraggedStore);
  const websiteData = useAppSelector(website);
  const canvasZoomLevel = useAppSelector(zoomLevel)

  // Setting the size of the canvas via the deviceType
  const [deviceSize, setDeviceSize] = useState({
    width: 1024,
    height: 650
  });
  // Get the size of the window
  const windowSize = useWindowSize();

  // Change the device width based on the current device
  useEffect(() => {
    if (!canvasContainerWrapper.current) return;

    const deviceWidthMap = {
      desktop: {
        width:
          (canvasContainerWrapper.current.offsetWidth / (1024 + 50)) * 1000,
        height: 1000
      },
      laptop: {
        width:
          (canvasContainerWrapper.current.offsetWidth / (1350 + 50)) * 1000,
        height: 1000
      },
      mobile: {
        width: 390,
        height: 1000
      }
    };

    setDeviceSize({
      ...deviceSize,
      width: deviceWidthMap[currentDevice].width,
      height: deviceWidthMap[currentDevice].height
    });

    addPositionTagToElement(canvasContainer.current);
  }, [currentDevice]);

  let zoom = 1;

  const handleWheel = (e) => {
    // Prevent the default behavior of the scroll event
    dispatch(setZoomLevel('custom'));
    e.preventDefault();

    let scale = setCanvasZoom(e, zoom);

    if (canvasContainer.current) {
      canvasContainer.current.style.transform = `scale(${scale})`;
    }
    zoom = scale;

    addPositionTagToElement(canvasContainer.current);
  };

  useEffect(() => {
    const currentCanvasContainer = canvasContainer.current;

    detectCanvasOutOfBounds(currentCanvasContainer, canvasContainerWrapper.current);

    if (currentCanvasContainer) {
      addPositionTagToElement(currentCanvasContainer);
      currentCanvasContainer.addEventListener('wheel', handleWheel);
      // Cleanup event listener on component unmount
      return () => {
        currentCanvasContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const { width, height } = useElementSize(canvasContainer.current, currentDevice);

  // Pass in the max top value of the wrapper canvas to prevent the user from
  // being able to drag the canvas above that point (outside the viewport)
  useDragger(
    canvasContainer.current, {
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
      elementWrapperWidth: canvasContainerWrapper.current?.clientWidth,
      elementHeight: height,
      elementWidth: width,
    },
    canBeDragged
  );

  return (
    <div
      className="
        w-4/6 mt-navbar bg-black-75 fixed overflow-hidden 
        flex justify-center items-center bottom-0
      "
      ref={canvasContainerWrapper}
    >
      <iframe className="size-full z-[100]" src="https://www.google.com/search?igu=1" />
      <div
        className="
          size-0 fixed border border-black-50
        "
        style={{
          isolation: 'isolate',
          willChange: 'transform',
          cursor: canBeDragged ? 'grab' : 'default',
          width: deviceSize.width,
          top: canvasContainerWrapper.current?.offsetTop + 20,
          height: '90vh',
          backgroundColor: websiteData?.websiteBackgroundColor || 'white',
          transform: `scale(${canvasZoomLevel}%)`
        }}
        id="canvas-container"
        ref={canvasContainer}
      >
        <div
          className="h-[650px] transition-all duration-200 fixed text-black"
          style={{
            maxWidth: deviceSize.width
          }}
          id="canvas"
        >
          {/* <div className="pt-20 text-white">
            {canvasZoomLevel}
          </div> */}
        </div>
      </div>      
      <SiteBuilderCanvasHotbar 
        canvasContainer={canvasContainer} 
        canvasContainerWrapper={canvasContainerWrapper} 
      />
    </div>
  );
}
