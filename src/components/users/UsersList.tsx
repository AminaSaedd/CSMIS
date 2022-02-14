import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { User } from '../../models/users';
import ChangePassword from './ChangePassword';

const UsersList = () => {
const navigate= useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  
  const MySwal = withReactContent(Swal);

  const fetchData = useCallback(async () => {
    const users: any = await axiosRequest(
      ENDPOINTS.Users
    ).fetchAll();

    setUsers(users?.data);
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onUserStatusChangeClickHandler = async (user: User) => {
    const res = await axiosRequest(ENDPOINTS.Users).put(user.id, {});
    if (res?.status === 200) {
      fetchData();
      Swal.fire("😊", "user status has been changes successfully.", "success");
    }
  }
  
  const ChangePasswordHandler = (u: User) => {
    // navigate('/users/changePassword', {state:u});
        MySwal.fire({
            showConfirmButton: false,
            allowOutsideClick: false,
            showCloseButton: true,
            width: 600,
            html: <ChangePassword user={u} />
        })
  }

  return (
    <>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Users</h5>

            <table className="table table-striped">
              <thead className="bg-info">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">UserName</th>
                  <th scope="col"></th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  isFetching ? 
                  "Fetching Data..."
                  :
                  users?.map((u: User, i) => {
                    return (
                      <tr key={i}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.userName}</td>
                        <td>
                          <button
                            className='btn  btn-warning'
                            onClick={(e) => { onUserStatusChangeClickHandler(u) }}
                          >
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                          <td>
                        <button className='btn btn-info' onClick={(e) => { ChangePasswordHandler(u) }} >change Password</button></td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
