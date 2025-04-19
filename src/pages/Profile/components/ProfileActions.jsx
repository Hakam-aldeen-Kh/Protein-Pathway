import IconButton from "./IconButton";

const ProfileActions = ({
  onLogout,
  onResetPassword,
  // onDeleteAccount
}) => (
  <div className="text-[#57369E] text-sm space-y-5">
    <IconButton
      icon="/images/icons/logout.svg"
      text="Log Out"
      onClick={onLogout}
      alt="Logout icon"
    />
    <IconButton
      icon="/images/icons/key-square.svg"
      text="Change My Password"
      onClick={onResetPassword}
      alt="Change password icon"
    />
    {/* <IconButton
      icon="/images/icons/close-square.svg"
      text="Delete My Account"
      onClick={onDeleteAccount}
      alt="Delete account icon"
    /> */}
  </div>
);

export default ProfileActions;
