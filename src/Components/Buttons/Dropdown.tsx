import { Button, ListDivider, Menu, MenuItem } from "@mui/joy";
import { useState } from "react";
import utils from "../../Utils";

export interface DropdownItemProps {
  text?: any;
  divider?: boolean;
  onClick?(): any;
}

interface DropdownProps {
  id?: string;
  title: string;
  items?: DropdownItemProps[];
  fullWidth?: boolean
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<any>();

  return <>
    <Button
      id={props.id || utils.newGuid()}
      variant="outlined"
      color="neutral"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      }}
      fullWidth={props.fullWidth}
    >
      {props.title}
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      {props.items?.map(item => !item.divider ? <MenuItem onClick={item.onClick}>{item.text}</MenuItem> : <ListDivider />)}
    </Menu>
  </>
}

export default Dropdown;
