import React from 'react'
import Flatpickr from "react-flatpickr";

interface DatePickerProps {
  value?: string;
  onChange?([date]: any): void;
  disable?: boolean;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  return <React.Fragment>
    <Flatpickr
      className="form-control bg-white"
      data-enable-time
      value={props.value}
      onChange={([date]: any) => props.onChange && props.onChange(date)}
      disabled={props.disable}
    />
  </React.Fragment>
}

export default DatePicker
