'use client'
import React, { useState } from "react";
import DashboardSideBar from "./DashboardSideBar";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {

    let formErrors = {};
    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;

    // check for oldPassword
    if(!formData.oldPassword) {
        formErrors.oldPassword = "*Old Password is required";
    } else if(!passwordPattern.test(formData.oldPassword)) {
        formErrors.oldPassword = "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if(!formData.newPassword) {
        formErrors.newPassword = "*New Password is required";
    } else if(!passwordPattern.test(formData.newPassword)) {
        formErrors.newPassword = "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if(!formData.confirmPassword) {
        formErrors.confirmPassword = "*Confirm Password is required";
    } else if(formData.confirmPassword !== formData.newPassword) {
        formErrors.confirmPassword = "*Password does not match"
    }

    setError(formErrors);
    return Object.keys(formErrors).length === 0;

  }

  const handleSubmit = async(e) =>  {
    e.preventDefault();
    if(validate()) {
        setLoading(true);    // loader starts

        try {
          
          const formDataToSend = new FormData();
          Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
          });

          const res = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formDataToSend,
          });

          const data = await res.json();

          if(res.status === 400) {
            toast.error(data.message, {position: 'top-right'});
            setLoading(false);
            return;
          } 

          if(res.ok) {
            toast.success(data.message, {position: 'top-right'});
            router.push('/dashboard');    // redirected to dashboard
          } else {
            toast.error(data.message, {position: 'top-right'});
            localStorage.removeItem('token');
            localStorage.removeItem('handlename');
            router.push('/login');    // redirected to login
          }
      
        } catch (error) {
          console.log("error in change password", error);
          toast.error(error, {position: 'top-right'});
        } finally {
          console.log("final");
          setLoading(false);
        }
    }
    else {
        console.log("Not Validated");
    }
  }

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      Object.keys(error).forEach((inputName) => {
        if(inputName === name && value !== '') {
            delete error[inputName];
        }
    });
  }

  const handleToggle = (e) => {
    console.log("this event", e)
  }

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
          <DashboardSideBar />
            <div className="dashboard-content-wrap two">
              <div className="change-pass-wrap">
                <div className="edit-info-area">
                  <h6>Update Your Password</h6>
                  <form className="edit-info-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-50">
                        <div className="form-inner">
                          <label>Old Password</label>
                          <input
                            id="password"
                            type="password"
                            name="oldPassword"
                            value={formData?.oldPassword}
                            onChange={handleInputChange}
                            placeholder="Htydh746fg@1’;po\"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" onClick={handleToggle} />
                          {error.oldPassword && <p style={{color: 'red'}}>{error.oldPassword}</p>}
                        </div>
                      </div>
                      <div className="col-md-12 mb-30">
                        <div className="form-inner">
                          <label>New Password</label>
                          <input
                            id="password2"
                            type="password"
                            name="newPassword"
                            value={formData?.newPassword }
                            onChange={handleInputChange}
                            placeholder="Htydh746fg@1’;po\"
                          />
                          <i className="bi bi-eye-slash" id="togglePassword2" />
                          {error.newPassword && <p style={{color: 'red'}}>{error.newPassword}</p>}
                        </div>
                      </div>
                      <div className="col-md-12 mb-60">
                        <div className="form-inner">
                          <label>Confirm Password</label>
                          <input
                            id="password3"
                            type="password"
                            name="confirmPassword"
                            value={formData?.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Htydh746fg@1’;po\"
                          />
                          <i
                            className="bi bi-eye-slash bi-eye"
                            id="togglePassword3"
                          />
                          {error.confirmPassword && <p style={{color: 'red'}}>{error.confirmPassword}</p>}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="primary-btn btn-hover two">
                      Change Password
                      <span style={{ top: "40.5px", left: "84.2344px" }} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
