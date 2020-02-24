import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useHistory, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation()
  const [value, setValue] = React.useState(pathToNumber(location.pathname))
  const history = useHistory()
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(numberToPath(newValue))
      }}
      showLabels
    > 
      <BottomNavigationAction label="家事一覧" icon={<HomeWorkIcon />} />
      <BottomNavigationAction label="履歴" icon={<RestoreIcon />} />
      <BottomNavigationAction label="お小遣い" icon={<MonetizationOnIcon />} />
    </BottomNavigation>
  )
}

function pathToNumber(path) {
  switch(path) {
    case '/duty':
      return 0
    case '/':
      return 1
    case '/pocket':
      return 2
    default:
      return
  }
}

function numberToPath(number) {
  switch(number) {
    case 0:
      return '/duty'
    case 1:
      return '/';
    case 2:
      return '/pocket';
    default:
  }
}
