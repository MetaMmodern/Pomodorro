import React from "react";
import DangerZoneSettings from "../Account/DangerZoneSettings/DangerZoneSettings";

const AccountSettings = () => {
  return (
    <>
      <h2 style={{ fontWeight: "400" }}>Account Settings</h2>

      <ul>
        <li>Change username</li>
        <li>New password</li>
        <li>Confirm new password</li>
        <li>Old password if focused</li>
        <button>save</button>
      </ul>
      <DangerZoneSettings />
    </>
  );
};

export default AccountSettings;
