import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AlarmIcon from "@material-ui/icons/Alarm";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import { connect } from "react-redux";
import { togglePanel } from "../../redux/actions/actions";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
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
        <ListItem button key={"Timer"}>
          <ListItemIcon>
            <AlarmIcon />
          </ListItemIcon>
          <ListItemText primary={"Timer"} />
        </ListItem>

        <ListItem button key={"Tasks"}>
          <ListItemIcon>
            <LineWeightIcon />
          </ListItemIcon>
          <ListItemText primary={"Tasks"} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button key={"Settings"}>
          <ListItemIcon>
            <SettingsIcon />
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
