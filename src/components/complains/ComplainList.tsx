import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Complain } from '../../models/complain';


const ComplainList = () => {
  const navigate = useNavigate();
    const [complains, setComplains] = useState<Complain[]>([]);
    const[fetching, setIsFetching] = useState(true)

    const fetchData = useCallback(async () => {
        const complainList:any = await axiosRequest(
          ENDPOINTS.Complains
        ).fetchAll();
        
        setComplains(complainList?.data);
        setIsFetching(false);
        console.log("List os users ", ComplainList);
      }, []);
      useEffect(() => {
        fetchData();
      }, []);

      const onEditClickHandler = (c: Complain) => {
        navigate('/complains/editcomplain', {state:c});
      }
    
    
      const onDeleteClickHandler = async (c: Complain) => {
        const res = await axiosRequest(ENDPOINTS.Complains).delete(c.id);
        
        window.location.assign("/complains/list")
      }


  return (<>

<div className="col-lg-6">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Complains</h5>
        {fetching ? <h3 className="card-title">Data is Fetching</h3> :"" }
      <table className="table table-striped">
        <thead className="bg-info">
          <tr>
            <th scope="col">Phone </th>
            <th scope="col">Reported Issue</th>
            <th scope="col">TaxPayer Id</th>
            <th scope="col">Status </th>
            <th scope="col"> </th>
          
            <th scope="col">Actions </th>
            

          </tr>
        </thead>
        <tbody>
          
        {
        
        complains.map(( c:Complain, i ) => {
          return (
            <tr key={i}>
              <td>{c.phone}</td>
              <td>{c.reportedIssue}</td>
              <td>{c.taxPayerId}</td>
              <td>{c.status}</td>
              <td>

                        

                        <button className="btn btn-primary" onClick={e => onEditClickHandler(c)}>Edit</button>  </td>
                      <td><button className="btn btn-danger" onClick={e => onDeleteClickHandler(c)}>Delete</button></td>
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

export default ComplainList;
