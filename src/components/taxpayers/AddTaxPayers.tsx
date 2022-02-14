import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { axiosRequest, ENDPOINTS } from "../../api/config";
import { Device } from "../../models/device";
import { TaxPayer } from "../../models/taxpayer";

const AddTaxPayers = () => {
  const { register, handleSubmit, errors } = useForm();

  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const divices: any = await axiosRequest(ENDPOINTS.Devices).fetchAll();

    setDevices(divices?.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data: TaxPayer, e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const taxpayers = new TaxPayer();
    taxpayers.name = data.name;
    taxpayers.phone = data.phone;
    taxpayers.serialNo = data.serialNo;
    taxpayers.tin = data.tin;
    taxpayers.deviceId = data.deviceId;

    const res = await axiosRequest(ENDPOINTS.TaxPayers).post(taxpayers);
      console.log("status",res.status)
    setIsLoading(false);
    e.target.reset();
  };

  return (
    <>
      <div className="container card">
        <div className="card-body">
          <h5 className="card-title" id="form-header">
            Register New TaxPayer
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-5">
                <input
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
                  type="text"
                  className="form-control"
                  name="tIN"
                  id="tIN"
                  ref={register({ required: true })}
                />
                <span className="text-danger">
                  {errors.tIN && <span>This field is required.</span>}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Serial NO:
              </label>
              <div className="col-sm-5">
                <input
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
                      <option key={i} value={d.id}>
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
                  {isLoading ? "Loading..." :"Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaxPayers;
