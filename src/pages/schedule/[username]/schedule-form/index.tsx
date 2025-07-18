import { useState } from "react";
import { CalendarStep } from "./calendar-step";
import { ConfirmStep } from "./confirm-step";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  function handleClearSelectionDateTime() {
    setSelectedDateTime(null);
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectionDateTime}
      />
    );
  }

  return <CalendarStep onSelectedDateTime={setSelectedDateTime} />;
}
