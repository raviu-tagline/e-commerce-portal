import React from "react";

const ProfileImg = (props) => {
  return (
    <>
      <img src={props.path} className="profile-image" />
    </>
  );
};

export default ProfileImg;
