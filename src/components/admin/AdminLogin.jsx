"use client";
import { useState } from "react";
import "./AdminLogin.css";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import Loader from "../loader/Loader";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    let formErrors = {};

    // Handle Name validation
    if (!formData.name.trim()) {
        formErrors.name = "*Name is required";
    }

    // Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!formData.password) {
      formErrors.password = "*Password is required";
    } 
    // else if (!passwordPattern.test(formData.password)) {
    //   formErrors.password =
    //     "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    // }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // running on onchange of input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    Object.keys(errors).forEach((inputName) => {
      if (inputName === name && value !== "") {
        delete errors[inputName];
      }
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      // Clear any existing errors
    //   dispatch(clearErrors());

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            body: formDataToSend
          });
          const data = await res.json();
          console.log("===data===>", data);
          if(res.status === 401) {
            toast.error("Invalid handlename or password", {position: "top-right"})
            setLoading(false);
            return;
          } else if(res.status === 500) {
            toast.error("Internal Server Error", {position: "top-right"});
          } else {
            toast.success("Logged in successfully", {position: 'top-right'});
            localStorage.setItem('token', data.token)
            router.push('/admin/dashboard');
          }

      } catch (error) {
        console.log("error in admin login", error);
        toast.error("Internal Server Error", {position: "top-right"})
      } finally {
        console.log("finally");
        setLoading(false);
      }


    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
          <label htmlFor="handlename">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <Loader isLoading={loading} />
      </form>
    </div>
  );
};

export default AdminLogin;
