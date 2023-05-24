import Inventory from '@mui/icons-material/Inventory';
import React from 'react';

interface InventoryIconProps {
  size?: 'inherit' | 'large' | 'medium' | 'small'
}

const InventoryIcon: React.FunctionComponent<InventoryIconProps> = (props) => {
  return <Inventory fontSize={props.size} />
}

export default InventoryIcon
