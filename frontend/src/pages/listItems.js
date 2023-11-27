import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

const goPage = (page) => {
  window.location.href = window.location.origin + '/' + page;
}

export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => {goPage('')}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Ana Sayfa" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      İşlemler
    </ListSubheader>
    <ListItemButton onClick={() => {goPage('addStudent')}}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Öğrenci İşlemleri" />
    </ListItemButton>
    <ListItemButton onClick={() => {goPage('addParent')}}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Veli İşlemleri" />
    </ListItemButton>
    <ListItemButton onClick={() => {goPage('addStaff')}}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Personel İşlemleri" />
    </ListItemButton>
  </React.Fragment>
);
