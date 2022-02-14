import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosRequest, ENDPOINTS } from "../api/config";
import { TaxPayer } from "../models/taxpayer";
import { UserInfo } from "../ViewModels/userInfo";

export const Header = () => {  
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/#" className="logo d-flex align-items-center">
          <img src="/assets/img/logo2.png" alt="" />
          <span className="d-none d-lg-block" style={{fontWeight:"bolder"}}>CSMIS</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" />
      </div>
      {/* End Logo */}
      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search" />
          </button>
        </form>
      </div>
     
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search" />
            </a>
          </li>
        
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
             
              <span className="d-none d-md-block dropdown-toggle ps-2">
              { 
               (JSON.parse(localStorage.getItem("sys_user") ?? '{}') as UserInfo)?.userName
               }
              </span>
            </a>
         
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>
               { 
               (JSON.parse(localStorage.getItem("sys_user") ?? '{}') as UserInfo)?.name
               }
                </h6>
              </li>
             
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <NavLink to="/auth/logout" className="dropdown-item d-flex align-items-center" >
                  <i className="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </NavLink>
              </li>
            </ul>
           
          </li>
         
        </ul>
      </nav>
     
    </header>
  );
};
