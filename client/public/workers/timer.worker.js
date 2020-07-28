let timer = null;
let backtimer = null;
let time = 0;
function tick() {
  const nextTime = time + 1.1;
  if (nextTime <= 440) {
    postMessage({ response: "update", nextTime, direction: "forward" });
    time = nextTime;
  } else {
    postMessage({ response: "update", nextTime: 440, direction: "backward" });
    clearInterval(timer);
    postMessage({ response: "startReverse" });
  }
}

function backTick() {
  const nextTime = time - 1.1;
  if (nextTime >= 0) {
    postMessage({ response: "update", nextTime, direction: "backward" });
    time = nextTime;
  } else {
    postMessage({ response: "stop", nextTime: 0, direction: null });
    clearInterval(timer);
  }
}
function fastBackTick() {
  const nextTime = time - 17.6;
  if (nextTime >= 0) {
    postMessage({ response: "update", nextTime });
    time = nextTime;
  } else {
    postMessage({ response: "stop", nextTime: 0 });
    clearInterval(timer);
  }
}
onmessage = function (e) {
  switch (e.data.action) {
    case "start":
      time = e.data.startValue;
      timer = setInterval(() => {
        tick();
      }, e.data.interval);
      break;
    case "reverse":
      time = e.data.startValue;
      timer = setInterval(() => {
        backTick();
      }, e.data.interval);
      break;
    case "pause":
      clearInterval(timer);
      break;
    case "drop":
      clearInterval(timer);
      time = e.data.startValue;
      timer = setInterval(() => {
        fastBackTick();
      }, 8);
      break;
    default:
      break;
  }
};
