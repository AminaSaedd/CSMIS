import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { Device } from '../../models/device';
import { TaxPayer } from '../../models/taxpayer';

const EditTaxPayers = (props: any) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [taxPayer, setTaxPayer] = useState<TaxPayer>(new TaxPayer())

  const { state } = useLocation();

  const fetchData = useCallback(async () => {
    const divices: any = await axiosRequest(ENDPOINTS.Devices).fetchAll();
    setDevices(divices?.data);
  }, []);

  useEffect(() => {
    setTaxPayer(state as TaxPayer)

    fetchData();
  }, [fetchData, state]);

  const OnEdit = async (data: TaxPayer, e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const thisTaxPayer = taxPayer;

    thisTaxPayer.name = data.name;
    thisTaxPayer.phone = data.phone;
    thisTaxPayer.serialNo = data.serialNo;
    thisTaxPayer.tin = +data.tin;
    thisTaxPayer.deviceId = +data.deviceId;

    const res = await axiosRequest(ENDPOINTS.TaxPayers).put(taxPayer.id, thisTaxPayer);
    setIsLoading(false);

    console.log("Editing taxpayer", res)
    e.target.reset();

    window.location.assign("/taxpayers/list")
  };

  return (
    <>
      <div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
            Register New TaxPayer
          </h5>
          <form onSubmit={handleSubmit(OnEdit)}>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-5">
                <input
                  defaultValue={taxPayer?.name}
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.name && <span>This field is required.</span>}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Phone Number
              </label>
              <div className="col-sm-5">
                <input
                  defaultValue={taxPayer?.phone}
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
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                TIN:
              </label>
              <div className="col-sm-5">
                <input
                  defaultValue={taxPayer?.tin}
                  type="text"
                  className="form-control"
                  name="tin"
                  id="tin"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.tin && <span>This field is required.</span>}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Serial NO:
              </label>
              <div className="col-sm-5">
                <input
                  defaultValue={taxPayer?.serialNo}
                  type="text"
                  className="form-control"
                  name="serialNo"
                  id="serialNo"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.serialNo && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Divices</label>
              <div className="col-sm-5">
                <select
                  className="form-select"
                  name="deviceId"
                  id="deviceId"
                  aria-label="Default select example"
                  ref={register({ required: true })}
                >
                  <option></option>
                  {devices?.map((d: Device, i) => {
                    return (
                      <option
                        selected={d?.id === taxPayer?.deviceId}
                        key={i} value={d.id}>
                        {d.deviceModel}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">
                  {errors.deviceId && <span>This field is required.</span>}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-5">
                <button type="submit" className="form-control  btn btn-info" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Edit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditTaxPayers