import React from 'react'
import { Calendar, LocaleConfig } from "react-native-calendars";

const Calender = (props) => {

  return (
    <Calendar
    className="shadow-sm rounded-2xl mb-5 shadow-black w-full"
    style={{ minHeight: 366}}
    minDate={Date()}
    enableSwipeMonths
    onDayPress={(day) => {
      props.setSelected(day.dateString)
    }}
    markedDates={{
      [props.selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: "orange",
      },
    }}
  />
  )
}

export default Calender