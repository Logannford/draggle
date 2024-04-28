import { useEffect } from "react";

const usePageRefresh = (isSaving: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isSaving) {
        // Prompt the user to confirm leaving the page
        event.preventDefault();
      }
    };

    // Add the event listener when changes are unsaved
    if (isSaving) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      // If changes are saved, remove the event listener
      const cleanup = () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
      cleanup(); // Immediately remove the listener on cleanup
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaving]); // Only re-run effect if hasSaved changes
};

export default usePageRefresh;
