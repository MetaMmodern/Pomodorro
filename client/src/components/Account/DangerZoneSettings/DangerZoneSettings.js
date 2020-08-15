import React from "react";

const DangerZoneSettings = () => {
  return (
    <div>
      <h2 style={{ fontWeight: "400" }}>Danger Zone</h2>
      <ul style={{ border: "1px solid red", borderRadius: "5px" }}>
        <li>Delete all progress</li>
        <li>Delete all tasks</li>
        <li>Delete my account</li>
      </ul>
    </div>
  );
};

export default DangerZoneSettings;
