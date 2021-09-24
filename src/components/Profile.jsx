/* eslint-disable */
import React, { useEffect, useState } from "react";

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
    <React.Fragment>
      <div className="container mt-5">
        <div className="card shadow p-3">
          <div className="row">
            <div className="col-6">
              <img
                src="images/default-avtar.png"
                alt="profile image"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid #dee2e6",
                }}
              />
            </div>
            <div className="col-6 my-5">
              <table style={{ width: "inherit", height: "100%" }}>
                <tbody>
                  {userInfo && (
                    <React.Fragment>
                      <tr>
                        <td>Name</td>
                        <td className="">{userInfo.name}</td>
                      </tr>

                      <tr>
                        <td>Age</td>
                        <td className="">{userInfo.age}</td>
                      </tr>

                      <tr>
                        <td>Contact</td>
                        <td className="">{userInfo.number}</td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td className="">{userInfo.email}</td>
                      </tr>

                      <tr>
                        <td>Role</td>
                        <td className="">{userInfo.role}</td>
                      </tr>
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
