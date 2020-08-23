import React from "react";
import clsx from "clsx";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { Settings, Alarm, LineWeight } from "@material-ui/icons";
import { connect } from "react-redux";
import { togglePanel } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";

import useStyles from "./Panel.style";

function Panel(props) {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  // list of items in side panel
  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: false,
      })}
      role="presentation"
      onClick={props.togglePanel}
      onKeyDown={props.togglePanel}
    >
      <List>
        <ListItem button key={"Timer"} component={NavLink} to="/">
          <ListItemIcon>
            <Alarm />
          </ListItemIcon>
          <ListItemText primary={"Timer"} />
        </ListItem>
        <ListItem button key={"Tasks"} component={NavLink} to="/tasks">
          <ListItemIcon>
            <LineWeight />
          </ListItemIcon>
          <ListItemText primary={"Tasks"} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button key={"Settings"} component={NavLink} to="/settings">
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor="left"
          open={props.isOpen}
          onClose={props.togglePanel}
          onOpen={props.togglePanel}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isOpen: state.sidePanel.isOpen,
});

const mapDispatchToProps = {
  togglePanel,
};
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
