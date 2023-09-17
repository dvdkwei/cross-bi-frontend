import { ReactElement, SyntheticEvent, createContext, useState } from "react";

export type TimeFrameProviderValue = {
  fromDate: string,
  toDate: string,
  fromDateHandler: (event: SyntheticEvent) => void,
  toDateHandler: (event: SyntheticEvent) => void,
  resetTimeFrame: () => void;
};

export const TimeFrameContext = createContext<TimeFrameProviderValue | undefined>(undefined);

export const TimeFrameProvider = ({ children }: { children: ReactElement }) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const fromDateHandler = (event: SyntheticEvent) => {
    setFromDate((event.target as HTMLInputElement).value);
  }

  const toDateHandler = (event: SyntheticEvent) => {
    setToDate((event.target as HTMLInputElement).value);
  }

  const resetTimeFrame = () => {
    setFromDate('');
    setToDate('');
  }

  const value: TimeFrameProviderValue = {
    fromDate,
    toDate,
    fromDateHandler,
    toDateHandler,
    resetTimeFrame
  }

  return (
    <TimeFrameContext.Provider value={value}>
      {children}
    </TimeFrameContext.Provider>
  )
}