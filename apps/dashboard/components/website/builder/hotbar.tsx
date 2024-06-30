import { m as motion, LazyMotion, domAnimation } from "framer-motion";
import { CursorArrowIcon } from "@radix-ui/react-icons";
import { Move, ZoomIn, Check } from "lucide-react";

import { recenterCanvas } from "@/utils/canvas/utils";
import { setIsDragged, setMode, canvasMode, isDragged, setZoomLevel, type ZoomLevel, zoomLevel } from "@/store/slices/canvas";
import { useAppDispatch, useAppSelector } from "@/utils/index";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function ZoomDropdownMenu({ item }){
  const dispatch = useAppDispatch();
  const mode = useAppSelector(canvasMode);
  const canvasZoomLevel = useAppSelector(zoomLevel)
  const zoomLevels: ZoomLevel[] = [25, 50, 75, 100] as const

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`rounded-md p-2
          ${mode === item.id ? 'bg-black-50' : ''}
          `}
          onClick={() => dispatch(setMode('zoom'))}
        >
          <item.icon className="size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent   
        className="bg-black-300 border border-black-50 text-sm font-satoshi p-0 w-32"
        onInteractOutside={() => dispatch(setMode('move'))}
      >
        <div 
          className="flex flex-col gap-y-2 p-2 text-end justify-end"
          style={{
            textAlignLast: 'start'
          }}
        >
          {canvasZoomLevel === 'custom' && (
            <div
              className="w-full bg-black-50 p-1 rounded-md text-white flex justify-between items-center"
            >
              <span>
                Custom
              </span>
              <Check className="size-3 text-white ml-1" />
            </div>
          )}
          {zoomLevels.map((level) => (
            <button
              key={level}
              onClick={() => {
                dispatch(setZoomLevel(level))
              }}
              className={[
                "text-xs hover:bg-black-50 rounded-md px-1 py-2 w-full flex justify-between items-center",
                canvasZoomLevel === level ? "bg-black-50" : ""
              ].join(" ")}
            >
              {level}%
              {canvasZoomLevel === level && (
                <Check className="size-3 text-white ml-1" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function SiteBuilderRecenterButton({ 
  canvasContainer,
  canvasContainerWrapper
}: {
  canvasContainer: React.RefObject<HTMLDivElement>,
  canvasContainerWrapper: React.RefObject<HTMLDivElement>
}){
  const dispatch = useAppDispatch();
  const mode = useAppSelector(canvasMode);
  const hasBeenDragged = useAppSelector(isDragged)

  const handleRecenterCanvas = (canvasContainer) => {
    // call the recenterCanvas function
    recenterCanvas(canvasContainer, canvasContainerWrapper.current)
    // dispatch the isDragged action to false
    dispatch(setIsDragged(false))
  }

  const items = [
    {
      id: 'move',
      icon: () => (
        <Move
          className="size-3.5"
        />
      ),
      onClick: () => dispatch(setMode('move')),
      selected: mode === 'move'
    },
    {
      id: 'select',
      icon: () => (
        <CursorArrowIcon
          className="size-3.5"
        />
      ),
      onClick: () => dispatch(setMode('select')),
      selected: mode === 'select'
    },
    {
      id: 'zoom',
      icon: () => (
        <ZoomIn
          className="size-3.5"
        />
      ),
      slot: <ZoomDropdownMenu item={{ id: 'zoom', icon: ZoomIn }} />,
      selected: mode === 'zoom'
    }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="
          bg-black-300 bottom-4 rounded-lg absolute 
          p-2 font-satoshi flex gap-x-3 items-center border border-black-50
        "
        transition={{ duration: 0.25 }}
        initial={{ bottom: -100 }}
        animate={{ bottom: 10 }}
        aria-label="Site Builder Hotbar"
      >
        <div className="flex items-center gap-x-2">
          {items.map((item) => (
            item.slot ? item.slot : (
              <button
                key={item.id}
                className={`rounded-md p-2
                  ${item.selected ? 'bg-black-50' : ''}
                `}
                aria-label={item.id}
                onClick={() => item.onClick()}
              >
                <item.icon />
              </button>
            )
          ))}
        </div>
        {hasBeenDragged && (
          <>
            <div className="w-px h-6 bg-black-50"></div>
            <motion.button
              className="font-inter font-medium text-xs bg-black-100 p-2 rounded-md hover:bg-black-50 duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-label="Recenter the canvas"
              onClick={() => handleRecenterCanvas(canvasContainer.current)}
            >
              Recenter
            </motion.button>
          </>
        )}
      </motion.div>
    </LazyMotion>
  )
}