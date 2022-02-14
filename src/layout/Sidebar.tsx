import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link " >
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </NavLink>
        </li>
       
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="#/"
          > 
        <i className="bi bi-person-circle"/>
      
            <span>Users</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <NavLink to="users/register">
                <i className="bi bi-plus-circle-fill" />
                <span>Add User</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users/list">
                <i className="bi bi-plus-circle-fill" />
                <span> Users</span>
              </NavLink>
            </li>
          
          </ul>
        </li>
        
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#t-nav"
            data-bs-toggle="collapse"
            href="#/"
          >
        <i className="bi bi-people-fill"/>
      
            <span>Tax-Payers</span>
          </a>
          <ul
            id="t-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <NavLink to="/taxpayers/add">
                <i className="bi bi-plus-circle-fill" />
                <span>Add TaxPayer </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/taxpayers/list">
                <i className="bi bi-plus-circle-fill" />
                <span> Tax Payers</span>
              </NavLink>
            </li>
          
          </ul>
        </li>
        
       

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#/"
          >
            <i className="bi bi-layout-text-window-reverse" />
            <span>Complains</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
           
              <NavLink to="/complains/add">
                <i className="bi bi-plus-circle-fill" />
                <span>New Complain</span>
              </NavLink>
            </li>
            <li>
             
            <NavLink to="/complains/list">
                <i className="bi bi-plus-circle-fill" />
                <span>Complain List</span>
              </NavLink>
            </li>
            <li>
             
             <NavLink to="/complainTypes/add">
                 <i className="bi bi-plus-circle-fill" />
                 <span> New Complain Type</span>
               </NavLink>
             </li>
             <li>
             
             <NavLink to="/complainTypes/list">
                 <i className="bi bi-plus-circle-fill" />
                 <span> Complain Types</span>
               </NavLink>
             </li>
             
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#s-nav"
            data-bs-toggle="collapse"
            href="#/"
          >
        <i className="bi bi-file-earmark-plus"/>
      
            <span>Devices</span>
          </a>
          <ul
            id="s-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <NavLink to="/devices/add">
                <i className="bi bi-plus-circle-fill" />
                <span>New Device </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/devices/List">
                <i className="bi bi-plus-circle-fill" />
                <span> Devices</span>
              </NavLink>
            </li>
          
          </ul>
        </li>
        
       
</ul>

        
    </aside>
  );
};
