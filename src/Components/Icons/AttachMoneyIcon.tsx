import AttachMoney from '@mui/icons-material/AttachMoney';
import React from 'react';

interface AttachMoneyIconProps {
  size?: 'inherit' | 'large' | 'medium' | 'small';
}

const AttachMoneyIcon: React.FunctionComponent<AttachMoneyIconProps> = (props) => {
  return <AttachMoney fontSize={props.size}/>
}

export default AttachMoneyIcon
