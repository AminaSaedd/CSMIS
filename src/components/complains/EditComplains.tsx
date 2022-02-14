import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Complain } from '../../models/complain';
import { ComplainType } from '../../models/complainType';
import { TaxPayer } from '../../models/taxpayer';

const EditComplains = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [complainTypes, setComplainTypes] = useState<ComplainType[]>([]);
    const [complain, setComplains] = useState<Complain>((new Complain));
    const [taxpayers, setTaxpayers] = useState<TaxPayer[]>([]);
    const { register, handleSubmit, errors } = useForm();
    const { state } = useLocation();


    const fetchData = useCallback(async () => {
        const taxpapayer: any = await axiosRequest(ENDPOINTS.TaxPayers).fetchAll();
        setTaxpayers(taxpapayer?.data);
      }, []);
    
      useEffect(() => {
        setComplains(state as Complain)
    
        fetchData();
      }, [fetchData, state]);

    const OnEditComplains = async (data: Complain, e: any) => {
        e.preventDefault();
        setIsLoading(true);
    
        const complains = complain;
        complains.phone = data.phone;
       complains.reportedIssue= data.reportedIssue;
       complains.taxPayerId= data.taxPayerId;
       complains.status= data.status
       
    
        const res = await axiosRequest(ENDPOINTS.Complains).put(complain.id, complains);
        setIsLoading(false);
        e.target.reset();
    
        window.location.assign("/complains/list")
      };
    
  return (
  

<>

<div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
           Update Complain
          </h5>
          <form onSubmit={handleSubmit(OnEditComplains)}>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Phone Number
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="phone"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.phone && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Tax Payers</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  name="taxPayerId"
                  id="taxPayerId"
                  aria-label="Default select example"
                  ref={register({ required: true })}
                >
                  <option></option>
                  {taxpayers?.map((t: TaxPayer, i) => {
                    return <option 
                    selected={t?.id === complain?.taxPayerId}
                    key={i} value={t.id}>{t.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {errors.taxPayerId && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Complain Types</label>
              
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="form-control  btn btn-info">
               Edit    
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>

  

  )
}



export default EditComplains