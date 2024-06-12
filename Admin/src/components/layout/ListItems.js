import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  
} from "@mui/material";
import {
  // Dashboard as DashboardIcon,
  // DashboardOutlinedIcon as DashboardIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  AppSettingsAltTwoTone as InspectionIcon,
  SellTwoTone as SellItForMeIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
} from "@mui/icons-material";
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { Link } from "react-router-dom";
// import Charts from "./Charts";
export const mainListItems = (
  <React.Fragment>
    {/* Dashboard */}
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    {/* Inspection */}
      <ListItemButton component={Link} to="/inspection">
        <ListItemIcon>
          <InspectionIcon />
        </ListItemIcon>
        <ListItemText primary="Inspection" />
      </ListItemButton>

    {/* Product Listing */}
    <ListItemButton component={Link} to="/products" >
      <ListItemIcon>
        <Inventory2OutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Product Listing" />
    </ListItemButton>

    {/* Sell for me request */}
    <ListItemButton component={Link} to="/requests">
      <ListItemIcon>
        <SellItForMeIcon />
      </ListItemIcon>
      <ListItemText primary="Sell for me Requests" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
