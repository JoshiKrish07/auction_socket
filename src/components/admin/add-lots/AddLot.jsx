"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import "./AddLot.css";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAuctions, fetchAllCategories, fetchAllMaterials } from "@/store/slices/allDataSlice";
import { fetchLotDetails } from "@/store/slices/auctionSlices";

const AddLot = ({lotId}) => {
  console.log("====lotId=====>", lotId);
  const router = useRouter();
  const [formData, setFormData] = useState({
    lot_code: "",
    lot_decription: "",
    lot_est_min_bid: "",
    lot_est_max_bid: "",
    lot_min_increment: '',
    lot_front_img: null,
    lot_img_1: null,
    lot_img_2: null,
    lot_img_3: null,
    lot_status: 'UNSOLD',
    materialId: "",
    categoryId: ""
  });

  const dispatch = useDispatch();
    const { data, error, loading: auctionLoading } = useSelector((state) => state.tablesData.allauctions);
    const { data: categoryData, error: categoryError, loading: categoryLoading} = useSelector((state) => (state.tablesData.allcategories));
    const { data: materialData, error: materialError, loading: materialLoading} = useSelector((state) => (state.tablesData.allmaterials));

    const { lotDetails: lotData } = useSelector((state) => state.auction); // lot details
    useEffect(() => {
        //call if allAuctions is empty
        
        if (data.length === 0) {
            dispatch(fetchAllAuctions());
        }
        if(categoryData.length === 0) {
            dispatch(fetchAllCategories())
        }

        if(materialData.length === 0) {
            dispatch(fetchAllMaterials())
        }

        const fetchData = async () => {
          await dispatch(fetchLotDetails(lotId));
        };
    
        if (lotId) {
          setLoading(true);
          if(!lotData) {
            fetchData();
          }
          console.log("====lotdata=====>", lotData);
          if(lotData) {
            setFormData({
              lot_code: lotData?.lot_code.split('-')[0],
              lot_decription: lotData?.lot_description,
              lot_est_min_bid: lotData?.lot_est_min_bid,
              lot_est_max_bid: lotData?.lot_est_max_bid,
              lot_min_increment: lotData?.lot_min_incr,
              lot_front_img: lotData?.lot_front_img,
              lot_img_1: lotData?.lot_img_1,
              lot_img_2: lotData?.lot_img_2,
              lot_img_3: lotData?.lot_img_3,
              lot_status: 'UNSOLD',
              materialId: lotData?.lot_cat_id,
              categoryId: lotData?.lot_mat_id,
            });
            setLoading(false)
          }
        }


    },[dispatch, data, categoryData, materialData, lotId]);

    // console.log("====data====>", data);
    // console.log("====categoryData====>", categoryData);
    // console.log("====materialData====>", materialData);


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const [auctCodeArr, setAuctCodeArr] = useState([]);
  const validate = () => {
    let formErrors = {};
    console.log("====formData====>", formData);
    // Lot Code validation
    if (!formData.lot_code.trim()) {
        formErrors.lot_code = "*Lot Code is required";
    }

    // Lot lot_est_min_bid validation
    if (!formData.lot_est_min_bid) {
        formErrors.lot_est_min_bid = "*Lot Min Bid is required";
    }

    // Lot lot_est_max_bid validation
    if (!formData.lot_est_max_bid) {
        formErrors.lot_est_max_bid = "*Lot Max Bid is required";
    }

    // Lot lot_min_increment validation
    if (!formData.lot_min_increment) {
        formErrors.lot_min_increment = "*Lot Min Increment is required";
    }

    // Lot Front Image validation
    let imageReg = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if (!formData.lot_front_img) {
      formErrors.lot_front_img = "*Front Image is required";
    } else if (!imageReg.exec(formData.lot_front_img.name)) {
      lotId ? '' : formErrors.lot_front_img = "*Only Images allowed";
    }

    // Lot  img1 validation
    if (!formData.lot_img_1) {
      formErrors.lot_img_1 = "*Image 1 is required";
    } else if (!imageReg.exec(formData.lot_img_1.name)) {
      lotId ? '' : formErrors.lot_img_1 =  "*Only Images allowed";
    }

    // Lot  img2 validation
    if (!formData.lot_img_2) {
        formErrors.lot_img_2 = "*Image 2 is required";
      } else if (!imageReg.exec(formData.lot_img_2.name)) {
        lotId ? '' : formErrors.lot_img_2 = "*Only Images allowed";
    }

    // Lot  img3 validation
    if (!formData.lot_img_3) {
        formErrors.lot_img_3 = "*Image 3 is required";
      } else if (!imageReg.exec(formData.lot_img_3.name)) {
        lotId ? '' : formErrors.lot_img_3 = "*Only Images allowed";
    }

    // Lot Description validation
    if (!formData.lot_decription.trim()) {
      formErrors.lot_decription = "*Lot Description is required";
    }

    // Validate materialId
    if (!formData.materialId) {
        lotId ? '' : formErrors.materialId = "*Material selection is required.";
    }

    // Validate materialId
    if (!formData.categoryId) {
        lotId ? '' : formErrors.categoryId = "*Category selection is required.";
    }

    console.log("=====formErrors====>", formErrors);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // save auct code in array
  const createAuctCodeArr = async() => {
    let arr = [];

    for(let auction of data.data) {
        arr.push(auction.auct_code);
    }

    setAuctCodeArr(arr);
  }

  // running on onchange of input fields
  const handleChange = async(e) => {
    const { name, value, files } = e.target;
    console.log("files", files)
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : name == 'lot_code' ? value.toUpperCase() : value,
    }));

    Object.keys(errors).forEach((inputName) => {
      if (inputName === name && value !== "") {
        delete errors[inputName];
      }
    });

    if(name === 'lot_code') {
        if(auctCodeArr.length === 0) {
            await createAuctCodeArr()
        }

        if(!auctCodeArr.includes(value.toUpperCase())) {
            setErrors((prev) => ({
                ...prev,
                [name] : "*Auction does not exists"
            }))
        }
    }
};

const checkAuctExist = async() => {
    if(auctCodeArr.length === 0) {
        await createAuctCodeArr()
    }
    console.log("====auctCodeArr===>", auctCodeArr);
    console.log("====formData['lot_code'].toUpperCase()===>", formData['lot_code'].toUpperCase());
    if(!auctCodeArr.includes(formData['lot_code'].toUpperCase())) {
        setErrors((prev) => ({
            ...prev,
            'lot_code' : "*Auction does not exists"
        }))
        return false;
    } 
   return true;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      // check for auction exist error
      let isAuctionExists = await checkAuctExist();
      if(!isAuctionExists) {
        setErrors({
            'lot_code' : "*Auction does not exists"
        });
        toast.error("Auction does not exists", { position: "top-right" });
        return;
      }

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

        const response = await fetch("/api/admin/add-lot", {
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
        console.log("======data==add-lots====>", data);
        if (response.ok) {
          setFormData({
            lot_code: "",
            lot_decription: "",
            lot_est_min_bid: "",
            lot_est_max_bid: "",
            lot_min_increment: '',
            lot_front_img: null,
            lot_img_1: null,
            lot_img_2: null,
            lot_img_3: null,
            lot_status: 'UNSOLD',
            materialId: "",
            categoryId: ""
          });
          setErrors({});
          toast.success("Lot added Successsfully", {
            position: "top-right",
          });
          router.push('/admin/dashboard');
        } else {
          toast.error(data.error, { position: "top-right" });
        }
      } catch (error) {
        console.error("Error during Lot add:", error);
        toast.error("Lot Add failed", { position: "top-right" });
      } finally {
        setLoading(false); // stop loader
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleSelect = (e) => {
    console.log("=====e=====val==>", e.target.value)
  }

  const handleUpdate = async(e) => {
    console.log("handleupdate")
    e.preventDefault();
    if(validate()) {
        // check for auction exist error
        // let isAuctionExists = await checkAuctExist();
        // if(!isAuctionExists) {
        //   setErrors({
        //       'lot_code' : "*Auction does not exists"
        //   });
        //   toast.error("Auction does not exists", { position: "top-right" });
        //   return;
        // }

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

          const response = await fetch(`/api/admin/update-lot/${lotId}`, {
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
          if (response.ok) {
            setFormData({
              lot_code: "",
              lot_decription: "",
              lot_est_min_bid: "",
              lot_est_max_bid: "",
              lot_min_increment: '',
              lot_front_img: null,
              lot_img_1: null,
              lot_img_2: null,
              lot_img_3: null,
              lot_status: 'UNSOLD',
              materialId: "",
              categoryId: ""
            });
            setErrors({});
            toast.success("Lot Updated Successsfully", {
              position: "top-right",
            });
            router.push('/admin/dashboard');
          } else {
            toast.error(data.error, { position: "top-right" });
          }
        } catch (error) {
          console.error("Error during Lot add:", error);
          toast.error("Lot Update failed", { position: "top-right" });
        } finally {
          setLoading(false); // stop loader
        }
    } else {
      console.log("form is not validated");
    }
  }

  return (
    <>
      {/* {auctionLoading || materialLoading || categoryLoading && <Loader />} */}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap auct_form_wrap">
                <div className="form-container">
                  <h2>Lot Form</h2>
                  <form onSubmit={lotId ? handleUpdate : handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                      <label htmlFor="lot_code">Lot Code:</label>
                      <input
                        type="text"
                        id="lot_code"
                        name="lot_code"
                        value={formData.lot_code}
                        onChange={handleChange}
                        style={{textTransform:'uppercase'}}
                      />
                      {errors.lot_code && (
                        <p className="error">{errors.lot_code}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_decription">Lot Description</label>
                      <input
                        type="text"
                        id="lot_decription"
                        name="lot_decription"
                        value={formData.lot_decription}
                        onChange={handleChange}
                      />
                      {errors.lot_decription && (
                        <p className="error">{errors.lot_decription}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_est_min_bid">Lot Min Bid</label>
                      <input
                        type="number"
                        id="lot_est_min_bid"
                        name="lot_est_min_bid"
                        value={formData.lot_est_min_bid}
                        onChange={handleChange}
                      />
                      {errors.lot_est_min_bid && (
                        <p className="error">{errors.lot_est_min_bid}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_est_max_bid">Lot Max Bid</label>
                      <input
                        type="number"
                        id="lot_est_max_bid"
                        name="lot_est_max_bid"
                        value={formData.lot_est_max_bid}
                        onChange={handleChange}
                      />
                      {errors.lot_est_max_bid && (
                        <p className="error">{errors.lot_est_max_bid}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_min_increment">Lot Min Increment</label>
                      <input
                        type="number"
                        id="lot_min_increment"
                        name="lot_min_increment"
                        value={formData.lot_min_increment}
                        onChange={handleChange}
                      />
                      {errors.lot_min_increment && (
                        <p className="error">{errors.lot_min_increment}</p>
                      )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="materialId">Material</label>
                        <select
                            id="materialId"
                            name="materialId"
                            value={formData.materialId}
                            onChange={handleChange}
                            >
                            <option value="">Select Material</option>
                            {materialData && Array.isArray(materialData.data) && materialData.data.length > 0 ? (
                                materialData.data.map((material) => (
                                <option key={material.mat_id} value={material.mat_id}>
                                    {material.mat_name}
                                </option>
                                ))
                            ) : (
                                <option disabled>No materials available</option>
                            )}
                            </select>
                        {errors.materialId && (
                        <p className="error">{errors.materialId}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData?.categoryId}
                            onChange={handleChange}
                            >
                            <option value="">Select Category</option>
                            {categoryData && Array.isArray(categoryData.data) && categoryData.data.length > 0 ? (
                                categoryData.data.map((category) => (
                                <option key={category.cat_id} value={category.cat_id}>
                                    {category.cat_name}
                                </option>
                                ))
                            ) : (
                                <option disabled>No Category available</option>
                            )}
                            </select>
                        {errors.categoryId && (
                        <p className="error">{errors.categoryId}</p>
                        )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_front_img">Lot Front Image</label>
                      <input
                        type="file"
                        id="lot_front_img"
                        name="lot_front_img"
                        onChange={handleChange}
                      />
                      {lotId && lotData ? (<>
                        <img src={`/${lotData.lot_front_img}`} alt="" width='30px' />
                      </>) : ''}
                      {errors.lot_front_img && (
                        <p className="error">{errors.lot_front_img}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_img_1">Lot Image 1</label>
                      <input
                        type="file"
                        id="lot_img_1"
                        name="lot_img_1"
                        onChange={handleChange}
                      />
                      {lotId && lotData ? (<>
                        <img src={`/${lotData.lot_img_1}`} alt="" width='30px' />
                      </>) : ''}
                      {errors.lot_img_1 && (
                        <p className="error">{errors.lot_img_1}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_img_2">Lot Image 2</label>
                      <input
                        type="file"
                        id="lot_img_2"
                        name="lot_img_2"
                        onChange={handleChange}
                      />
                      {lotId && lotData ? (<>
                        <img src={`/${lotData.lot_img_2}`} alt="" width='30px' />
                      </>) : ''}
                      {errors.lot_img_2 && (
                        <p className="error">{errors.lot_img_2}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_img_3">Lot Image 3</label>
                      <input
                        type="file"
                        id="lot_img_3"
                        name="lot_img_3"
                        onChange={handleChange}
                      />
                      {lotId && lotData ? (<>
                        <img src={`/${lotData.lot_img_3}`} alt="" width='30px' />
                      </>) : ''}
                      {errors.lot_img_3 && (
                        <p className="error">{errors.lot_img_3}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lot_status">Lot Status</label>
                      <input
                        type="text"
                        id="lot_status"
                        name="lot_status"
                        value='UNSOLD'
                        onChange={handleChange}
                        readOnly
                      />
                      {/* {errors.lot_status && (
                        <p className="error">{errors.lot_status}</p>
                      )} */}
                    </div>

                    <button type="submit" className="submit-btn">
                      {lotId ? 'Update Lot' : 'Add Lot'}
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

export default AddLot;
