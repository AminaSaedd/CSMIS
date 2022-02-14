import React, { useCallback, useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Complain } from '../../models/complain';
import { TaxPayer } from '../../models/taxpayer';

// edit form start here saturday
const TaxPayersList = (props: any) => {
  const [taxpayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [fetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const taxpayersList: any = await axiosRequest(
      ENDPOINTS.TaxPayers
    ).fetchAll();

    setTaxPayers(taxpayersList?.data);
    setIsFetching(false);
    console.log(taxpayersList)
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const onEditClickHandler = (t: TaxPayer) => {
    navigate('/taxpayer/edit', {state:t});
  }


  const onDeleteClickHandler = async (t: TaxPayer) => {
    const res = await axiosRequest(ENDPOINTS.TaxPayers).delete(t.id);
    if (res?.status === 200) {
      fetchData();
      Swal.fire("✂", "user has successfully Deleted.", "error");
    }
    
    window.location.assign("/taxpayers/list")
  }
  return (<>

    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">TaxPayers</h5>
          {fetching ? <h3 className="card-title">Data is Fetching</h3> : ""}
          <table className="table table-striped">
            <thead className="bg-info">
              <tr>
                <th scope="col"> TaxPayer Name </th>
                <th scope="col">Phone Number</th>
                <th scope="col">Tin</th>
                <th scope="col">Serial No </th>
                <th scope="col">Device  </th>
                <th scope="col"></th>
                <th scope="col">Actions</th>

              </tr>
            </thead>
            <tbody>

              {

                taxpayers.map((t: TaxPayer, i) => {
                  return (
                    <tr key={i}>
                      <td>{t.name}</td>
                      <td>{t.phone}</td>
                      <td>{t.tin}</td>
                      <td>{t.serialNo}</td>
                      <td>{t.deviceId}</td>

                      <td>

                        {/* <button className='btn btn-md  bg-warning' {...{settaxPayerId}}>Edit</button></td> */}

                        <button className="btn btn-primary" onClick={e => onEditClickHandler(t)}>Edit</button>  </td>
                      <td><button className="btn btn-danger" onClick={e => onDeleteClickHandler(t)}>Delete</button></td>
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

export default TaxPayersList;
