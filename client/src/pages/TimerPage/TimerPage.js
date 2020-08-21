import React, { useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import TaskSelector from "../../components/TaskSelector/TaskSelector";
import CircleTimer from "../../components/CircleTimer/CircleTimer";
import { connect } from "react-redux";
import { manualStopTimer, setConfig } from "../../redux/actions/actions";
import useStyles from "./TimerPage.style";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.request";

function TimerSection(props) {
  const classes = useStyles();
  const { token, setNotification } = useContext(AuthContext);
  const { request } = useHttp();
  useEffect(() => {
    if (props?.location?.taskProp) {
      props.setConfig({
        timeInMinutes: props.location.taskProp.time.workTime,
        timeBackInMinutes: props.location.taskProp.time.restTime,
      });
    } else if (token) {
      async function getConfig() {
        try {
          const data = await request("api/auth/config", "GET", null, {
            Authorization: `Bearer ${token}`,
          });
          console.log(data);
          props.setConfig({
            timeInMinutes: data.workTime,
            timeBackInMinutes: data.restTime,
          });
        } catch (error) {
          setNotification({ open: true, message: error });
        }
      }
      getConfig();
    }
  }, [props, request, setNotification, token]);
  return (
    <div className={classes.timerSection}>
      <div>
        <TaskSelector
          selectedTask={{
            currentTask: props?.location?.taskProp?.currentTask,
            id: props?.location?.taskProp?.id,
          }}
        />
      </div>
      <CircleTimer className={classes.CircleTimer} />

      <Button
        onClick={props.manualStopTimer}
        color="primary"
        className={classes.DropTimer}
      >
        Drop timer
      </Button>
    </div>
  );
}
const mapDispatchToProps = {
  manualStopTimer,
  setConfig,
};
export default connect(null, mapDispatchToProps)(TimerSection);
