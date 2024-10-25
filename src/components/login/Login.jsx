"use client";
import { useState } from "react";
import "./Login.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { clearErrors, loginUser } from "@/store/slices/authSlices";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    handlename: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    let formErrors = {};

    // Handle Name validation
    if (!formData.handlename.trim()) {
      formErrors.handlename = "*Handle Name is required";
  }

    // Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!formData.password) {
      formErrors.password = "*Password is required";
    } else if (!passwordPattern.test(formData.password)) {
      formErrors.password =
        "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

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
      // try {
      //     const formDataToSend = new FormData();
      //     Object.keys(formData).forEach(key => {
      //       formDataToSend.append(key, formData[key]);
      //     });

      //   const response = await fetch("/api/auth/login", {
      //     method: 'POST',
      //     body: formDataToSend,
      //   });

      //   const data = await response.json();

      //   if (!response.ok) {
      //     toast.error(data.error, { position: "top-right" });
      //     setErrors({ ...data }); // Set errors if login fails
      //   } else {
      //     setFormData({
      //       email: '',
      //       password: '',
      //     });
      //     // Save the token 
      //     localStorage.setItem("token", data.token); // Store the token in local storage
      //     toast.success("Login Successsfully", { position: "top-right" });
      //     router.push('/'); // Redirect to the Home page
      //   }
      // } catch (error) {
        
      //   console.error("Error during login:", error);
      //   toast.error(error, { position: "top-right" });
      //   setErrors({ general: "An error occurred. Please try again." });

      // } finally {
      //   setLoading(false);
      // }

      // Clear any existing errors
      dispatch(clearErrors());

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // login call
      const action = await dispatch(loginUser(formDataToSend));

      if (loginUser.fulfilled.match(action)) {
        toast.success('Login Successful', { position: 'top-right' });
        localStorage.setItem('handlename', formData.handlename); 
        setLoading(false);
        // router.push('/'); // Redirect to Home page
        router.push('/dashboard'); // Redirect to Dashboard page
      } else {
        toast.error(action.payload, { position: 'top-right' });
        setLoading(false);
      }
      
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
          <label htmlFor="handlename">Handle Name:</label>
          <input
            type="text"
            id="handlename"
            name="handlename"
            value={formData.handlename}
            onChange={handleChange}
          />
          {errors.handlename && <p className="error">{errors.handlename}</p>}
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
      <div className="no-account">
        <p>
          No Account?
          <Link href="/register" className="link-register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
