import React, { useCallback, useEffect, useState } from 'react';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Complain } from '../../models/complain';
import { ComplainType } from '../../models/complainType';


const ComplainTypesList = () => {
    const [complainTypes, setComplainType] = useState<ComplainType[]>([]);
    const[fetching, setIsFetching] = useState(true)

    const fetchData = useCallback(async () => {
        const complainTypeList:any = await axiosRequest(
          ENDPOINTS.ComplainTypes
        ).fetchAll();
        
        setComplainType(complainTypeList?.data);
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
            <th scope="col">Name </th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
            
            

          </tr>
        </thead>
        <tbody>
          
        {
        
        complainTypes.map(( c:ComplainType, i ) => {
          return (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td><button className='btn btn-md  bg-warning'>Edit</button></td>
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

export default ComplainTypesList;
