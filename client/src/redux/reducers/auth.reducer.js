const initialState = { isOpen: false };

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_PANEL":
      if (
        action.event &&
        action.event.type === "keydown" &&
        (action.event.key === "Tab" || action.event.key === "Shift")
      ) {
        return state;
      }

      return { isOpen: !state.isOpen };

    default:
      return state;
  }
}
