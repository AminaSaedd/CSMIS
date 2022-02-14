import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest, ENDPOINTS } from "../../api/config";
import { Complain } from "../../models/complain";
import { ComplainType } from "../../models/complainType";
import { TaxPayer } from "../../models/taxpayer";

const AddComplain = () => {
  const { register, handleSubmit, errors } = useForm();
  const [complainTypes, setComplainTypes] = useState<ComplainType[]>([]);
  const [taxpayers, setTaxpayers] = useState<TaxPayer[]>([]);

  const fetchData = useCallback(async () => {
    const complainTypes:any = await axiosRequest(
      ENDPOINTS.ComplainTypes
    ).fetchAll();
    
    setComplainTypes(complainTypes?.data);

    axiosRequest(ENDPOINTS.TaxPayers)
      .fetchAll()
      .then((res) => setTaxpayers(res?.data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data: Complain, e: any) => {
    e.preventDefault();

    const complain = new Complain();

    complain.phone = data.phone;
    complain.taxPayerId = +data.taxPayerId;
    complain.complainTypeId = +data.complainTypeId;
    complain.reportedIssue = data.reportedIssue;

    const res = await axiosRequest(ENDPOINTS.Complains).post(complain);
    
    console.log({ res });

    e.target.reset();
  };
  return (
    <>
      <div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
            Add New Complain
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    return <option key={i} value={t.id}>{t.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {errors.taxPayerId && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Reported Issue
              </label>
              <div className="col-sm-10">
                <textarea
                  ref={register({ required: true })}
                  name="reportedIssue"
                  id="reportedIssue"
                  className="form-control"
                  style={{ height: 100 }}
                  defaultValue={""}
                />
                <span className="text-danger">
                  {errors.reportedIssue && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Complain Types</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  name="complainTypeId"
                  id="complainTypeId"
                  aria-label="Default select example"
                  ref={register({ required: true })}
                >
                  <option></option>
                  {complainTypes?.map((c: ComplainType, i) => {
                    return <option key={i}  value={c.id}>{c.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {errors.complainTypeId && (
                    <span>This field is required.</span>
                  )}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-10">
                <button type="submit" className="form-control  btn btn-info">
               Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddComplain;
