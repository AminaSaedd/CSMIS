import React from 'react';

const Logout = () => {
  localStorage.removeItem("sys_user");
  window.location.replace("/auth/login");
  return (<></>)
};

export default Logout;
