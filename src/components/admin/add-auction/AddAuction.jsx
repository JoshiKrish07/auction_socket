"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import "./AddAuction.css";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctionDetails } from "@/store/slices/auctionSlices";

const AddAuction = ({auctionId}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    auction_name: "",
    auct_code: "",
    auct_location: "",
    auct_detail: "",
    auct_image: null,
    auct_start_date: '',
    auct_end_date: '',
    auct_status: ''
  });
  const {singleAuctionDetail: auctionDetail} = useSelector((state) => state.auction);  // auction detail

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {

    const fetchData = async () => {
      await dispatch(fetchAuctionDetails(auctionId));
    };

    if(auctionId) {
      setLoading(true);
      if(!auctionDetail) {
        fetchData();
      } else {
        console.log("===auctionDetail====>", auctionDetail);
        setFormData({
          auction_name: auctionDetail?.auct_name,
          auct_code: auctionDetail?.auct_code,
          auct_location: auctionDetail?.auct_location,
          auct_detail: auctionDetail?.auct_detail,
          auct_image: auctionDetail?.image_address,
          auct_start_date: auctionDetail?.start_date,
          auct_end_date: auctionDetail?.end_date,
          auct_status: auctionDetail?.auct_status,
          auct_prev_status: auctionDetail?.auct_status
        })
        setLoading(false);
      }
    }

  },[auctionId, auctionDetail]);

  const validate = () => {
    let formErrors = {};

    // Auction Name validation
    if (!formData.auction_name.trim()) {
      formErrors.auction_name = "*Auction Name is required";
    }

    // Auction Code validation
    if (!formData.auct_code.trim()) {
      formErrors.auct_code = "*Auction Code is required";
    }

    // Auction Location validation
    if (!formData.auct_location.trim()) {
      formErrors.auct_location = "*Auction Location is required";
    }

    // Auction pic validation
    let imageReg = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if (!formData.auct_image) {
      formErrors.auct_image = "*Image is required";
    } else if(auctionId) {
      if(typeof formData.auct_image === 'object'  ) {
        if(!imageReg.exec(formData.auct_image.name)) {
          formErrors.auct_image = "*Only Images allowed";
        }
      } else if(!imageReg.exec(formData.auct_image)) {
        console.log("no");
        formErrors.auct_image = "*Only Images allowed";
      }
    } else if (!imageReg.exec(formData.auct_image.name)) {
      formErrors.auct_image = "*Only Images allowed";
    }

    // Auction detail validation
    if (!formData.auct_detail.trim()) {
      formErrors.auct_detail = "*Auction Detail is required";
    }

    // Auction start date validation
    if (!formData.auct_start_date) {
        formErrors.auct_start_date = "*Start date is required.";
      }
    
    // Auction end date validation
    if (!formData.auct_end_date) {
    formErrors.auct_end_date = "*End date is required.";
    } else if (formData.auct_start_date && new Date(formData.auct_end_date) < new Date(formData.auct_start_date)) {
    formErrors.auct_end_date = "*End date must be after the start date.";
    }

    console.log("=====formErrors====>", formErrors);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // running on onchange of input fields
  const handleChange = (e) => {
    let { name, value, files } = e.target;
    console.log("===name===", name, "====value=====", value);
    if(name === 'auct_code') {
      value = value.toUpperCase();
      console.log("value", value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    Object.keys(errors).forEach((inputName) => {
      if (inputName === name && value !== "") {
        delete errors[inputName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Session Expired, Please Login", { position: "top-right" });
            setLoading(false);
            return router.push("/admin");
        }

      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await fetch("/api/admin/add-auction", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        if (response.status === 401) {
            // Token is expired or invalid
            console.log("Token expired");
            localStorage.removeItem("token"); // Remove the expired token
            return router.push("/admin"); 
        }

        const data = await response.json();
        console.log("======data==add-auction====>", data);
        if (response.ok) {
          setFormData({
            auction_name: "",
            auct_code: "",
            auct_location: "",
            auct_detail: "",
            auct_image: null,
            auct_start_date: '',
            auct_end_date: '',
            auct_status: ''
          });
          setErrors({});
          toast.success("Auction added Successsfully", {
            position: "top-right",
          });
          router.push('/admin/dashboard');
        } else {
          toast.error(data.error, { position: "top-right" });
        }
      } catch (error) {
        console.error("Error during Auction add:", error);
        toast.error("Auction Add failed", { position: "top-right" });
      } finally {
        setLoading(false); // stop loader
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleUpdate = async(e) => {
      e.preventDefault();
      console.log("formData====>in===>update===>", formData);
      if(validate()) {
        setLoading(true);

        const token = localStorage.getItem("token");
  
          if (!token) {
              toast.error("Session Expired, Please Login", { position: "top-right" });
              setLoading(false);
              return router.push("/admin");
          }
  
        try {
          const formDataToSend = new FormData();
          Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
          });
  
          const response = await fetch(`/api/admin/update-auction/${auctionId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          });
  
          if (response.status === 401) {
              // Token is expired or invalid
              console.log("Token expired");
              localStorage.removeItem("token"); // Remove the expired token
              return router.push("/admin"); 
          }
  
          const data = await response.json();
          console.log("======data==add-auction====>", data);
          if (response.ok) {
            setFormData({
              auction_name: "",
              auct_code: "",
              auct_location: "",
              auct_detail: "",
              auct_image: null,
              auct_start_date: '',
              auct_end_date: '',
              auct_status: ''
            });
            setErrors({});
            toast.success("Auction updated Successsfully", {
              position: "top-right",
            });
            router.push('/admin/auctions');
          } else {
            toast.error(data.error, { position: "top-right" });
          }
        } catch (error) {
          console.error("Error during Auction update:", error);
          toast.error("Auction Update failed", { position: "top-right" });
        } finally {
          setLoading(false); // stop loader
        }
      } else {
        console.log("form validation failed");
      }
  }

  const handleSelect = (e) => {
    console.log("=====e=====val==>", e.target.value)
  }

  return (
    <>
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap auct_form_wrap">
                <div className="form-container">
                  <h2>Auction Form</h2>
                  <form onSubmit={auctionId ? handleUpdate : handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                      <label htmlFor="auction_name">Auction Name:</label>
                      <input
                        type="text"
                        id="auction_name"
                        name="auction_name"
                        value={formData.auction_name}
                        onChange={handleChange}
                      />
                      {errors.auction_name && (
                        <p className="error">{errors.auction_name}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_code">Auction Code:</label>
                      <input
                        type="text"
                        id="auct_code"
                        name="auct_code"
                        value={formData.auct_code}
                        onChange={handleChange}
                        style={{textTransform:'uppercase'}}
                      />
                      {errors.auct_code && (
                        <p className="error">{errors.auct_code}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_location">Location</label>
                      <input
                        type="text"
                        id="auct_location"
                        name="auct_location"
                        value={formData.auct_location}
                        onChange={handleChange}
                      />
                      {errors.auct_location && (
                        <p className="error">{errors.auct_location}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_detail">Auction Detail</label>
                      <input
                        type="text"
                        id="auct_detail"
                        name="auct_detail"
                        value={formData.auct_detail}
                        onChange={handleChange}
                      />
                      {errors.auct_detail && (
                        <p className="error">{errors.auct_detail}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_image">Auction Image:</label>
                      <input
                        type="file"
                        id="auct_image"
                        name="auct_image"
                        onChange={handleChange}
                      />
                      {auctionId && auctionDetail ? (<>
                        <img src={`/${auctionDetail.image_address}`} alt="" width='40px' />
                      </>) : ''}
                      {errors.auct_image && (
                        <p className="error">{errors.auct_image}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_start_date">Auction Start Date:</label>
                      <input
                        type="datetime-local"
                        id="auct_start_date"
                        name="auct_start_date"
                        onChange={handleChange}
                      />
                      {errors.auct_start_date && (
                        <p className="error">{errors.auct_start_date}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_end_date">Auction End Date:</label>
                      <input
                        type="datetime-local"
                        id="auct_end_date"
                        name="auct_end_date"
                        onChange={handleChange}
                      />
                      {errors.auct_end_date && (
                        <p className="error">{errors.auct_end_date}</p>
                      )}
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="auct_status">Auction Status</label>
                      <input
                        type="text"
                        id="auct_status"
                        name="auct_status"
                        value='LIVE'
                        onChange={handleChange}
                        readOnly
                      /> */}
                      <label htmlFor="auct_status">Auction Status</label>
                      <select 
                         onClick={handleSelect}
                         value={formData.auct_status}
                         name="auct_status"
                         id="auct_status"
                         onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value='LIVE'>LIVE</option>
                        <option value='UPCOMING'>UPCOMING</option>
                        <option value='CLOSED'>CLOSED</option>
                        <option value='COMPLETED'>COMPLETED</option>
                      </select>
                      {errors.auct_status && (
                        <p className="error">{errors.auct_status}</p>
                      )}
                    </div>

                    <button type="submit" className="submit-btn">
                      {auctionId ? 'Update Auction' : 'Add Auction'}
                    </button>
                    <Loader isLoading={loading} />
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

export default AddAuction;
