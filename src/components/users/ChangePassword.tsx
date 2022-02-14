import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { axiosRequest, ENDPOINTS } from '../../api/config';
import { User } from '../../models/users';

interface Props {
    user: User
}

const ChangePassword: React.FC<Props> = ({ user }) => {
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const OnEditChangePassword = async (data: any, e: any) => {
        e.preventDefault();
        setIsLoading(true);

        if (data.newPassword !== data.repeatePassword) {
            setErrorMsg("Confirm password doesn't match password.")
            setIsLoading(false);
            return;
        }

        const res = await axiosRequest(`${ENDPOINTS.Users}/ChangeUserPassword`)
            .put(user.id, { newPassword: data.newPassword })

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(OnEditChangePassword)} className="col-12">
            <div className="row">
                <h6>
                    Change User Password
                </h6>
            </div>
            <hr />
            <div className="col-12">
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-4">
                        New Password
                    </label>
                    <div className="col-8">
                        <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            id="newPassword"
                            ref={register({ required: true })}
                        />
                        <span className="text-danger">
                            {errors.newPassword && <span>This field is required.</span>}
                        </span>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-4">
                        Confirm Password
                    </label>
                    <div className="col-8">
                        <input
                            type="password"
                            className="form-control"
                            name="repeatePassword"
                            id="repeatePassword"
                            ref={register({ required: true })}
                        />
                        <span className="text-danger">
                            {errors.repeatePassword && <span>This field is required.</span>}
                        </span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col float-right">
                        <button type="submit" className="btn btn-info" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Change"}
                        </button>
                    </div>
                </div>
                <div className="row">
                    {
                        errorMsg &&
                        <span className="alert alert-danger">
                            {errorMsg}
                        </span>
                    }
                </div>
            </div>
        </form>
    )
}

export default ChangePassword