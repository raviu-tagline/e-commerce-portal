import React, { useEffect, useState } from "react";
import imgPath from "../images/default-avtar.png";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  let data = "";

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      data = JSON.parse(localStorage.getItem("user-info"));
      setUserInfo(data);
    }
  }, [data]);

  console.log(`userinfo`, userInfo);

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="row">
              <div className="col-6">
                <img
                  src={imgPath}
                  alt="profile image"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="col-6">
                <table>
                  <tbody>
                    {userInfo && (
                      <>
                        <tr>
                          <td>Name</td>
                          <td className="pl-5 pb-2">{userInfo.name}</td>
                        </tr>

                        <tr>
                          <td>Age</td>
                          <td className="pl-5 pb-2">{userInfo.age}</td>
                        </tr>

                        <tr>
                          <td>Contact</td>
                          <td className="pl-5 pb-2">{userInfo.number}</td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td className="pl-5 pb-2">{userInfo.email}</td>
                        </tr>

                        <tr>
                          <td>Role</td>
                          <td className="pl-5 pb-2">{userInfo.role}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
