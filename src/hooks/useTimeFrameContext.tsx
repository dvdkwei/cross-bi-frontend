import { useContext } from "react";
import { TimeFrameContext } from "../contexts/TimeFrameContext";

export const useTimeFrameContext = () => {
  return useContext(TimeFrameContext);
}