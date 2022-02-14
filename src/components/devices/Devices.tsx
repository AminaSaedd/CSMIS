import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Complain } from '../../models/complain';
import { ComplainType } from '../../models/complainType';
import { Device } from '../../models/device';


const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const[fetching, setIsFetching] = useState(true)

    const fetchData = useCallback(async () => {
        const devicesList:any = await axiosRequest(
          ENDPOINTS.Devices
        ).fetchAll();
        
        setDevices(devicesList?.data);
        setIsFetching(false);
      }, []);
      useEffect(() => {
        fetchData();
      }, []);
  return (<>

<div className="col-lg-6">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Complains</h5>
      
        {fetching ? <h3 className="card-title">Data is Fetching</h3> :"" }
      <table className="table table-striped">
        <thead className="bg-info">
          <tr>
            <th scope="col">ID </th>
            <th scope="col">DeviceModel</th>
            <th scope=""></th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          
        {
        
        devices.map(( d:Device, i ) => {
          return (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.deviceModel}</td>
              
              <td><Link to={"/editDevice"} className="btn btn-primary">Edit</Link>  </td>
            <td><button className='btn btn-md  bg-danger'>Delete</button></td>
            </tr>
          );
        })}
        </tbody>
      </table>

    </div>
  </div>
</div>


  </>);
};

export default Devices;
