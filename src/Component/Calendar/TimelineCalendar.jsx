"use client";
import React, { useContext, useEffect, useState } from "react";
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import UserContext from "@/context/UserContext";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import DateSelect from "../shared/form/DatePicker";
import dayjs from "dayjs";

const TimelineCalendar = () => {
  const {id, task } = useContext(UserContext);
  const { handleSubmit, control } = useForm();
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const onSubmit = (data) => {
    setStartDate(dayjs(data.startDate).format("YYYY-MM-DD"));
  };
  const config = {
    eventHeight: 30,
    headerHeight: 30,
    cellHeaderHeight: 25,
    onBeforeEventRender: (args) => {
      args.data.borderColor = "darker";
      if (args.data.backColor) {
        args.data.barColor = DayPilot.ColorUtil.lighter(args.data.backColor, 1);
      }
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: (args) => {
            const e = args.source;
            calendar.events.remove(e);
          },
        },
        {
          text: "-",
        },
        {
          text: "Blue",
          icon: "icon icon-blue",
          color: "#3d85c6",
          onClick: (args) => updateColor(args.source, args.item.color),
        },
        {
          text: "Green",
          icon: "icon icon-green",
          color: "#6aa84f",
          onClick: (args) => updateColor(args.source, args.item.color),
        },
        {
          text: "Yellow",
          icon: "icon icon-yellow",
          color: "#ecb823",
          onClick: (args) => updateColor(args.source, args.item.color),
        },
        {
          text: "Red",
          icon: "icon icon-red",
          color: "#d5663e",
          onClick: (args) => updateColor(args.source, args.item.color),
        },
        {
          text: "Auto",
          color: null,
          onClick: (args) => updateColor(args.source, args.item.color),
        },
      ],
    }),
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt(
        "Create a new event:",
        "Event 1"
      );

      if (!modal.result) {
        return;
      }

      calendar.clearSelection();

      calendar.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      });
    },
  };

  const updateColor = (e, color) => {
    e.data.backColor = color;
    calendar.events.update(e);
  };

  useEffect(() => {
    const filterTask = task?.filter((item) => item?.taskId === id);
    if (filterTask) {
      const formatedData = filterTask?.map((item) => ({
        id: item.id,
        text: item.projectName,
        start: item?.taskDate?.[0],
        end: item?.taskDate?.[1],
      }));
      setEvents(formatedData);
    }
  }, [ calendar,id]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DateSelect control={control} name="startDate" label="Select Date" />
        <Button type="submit">Search</Button>
      </form>
      <DayPilotMonth
        {...config}
        events={events}
        startDate={startDate}
        controlRef={setCalendar}
      />
    </div>
  );
};
export default TimelineCalendar;
