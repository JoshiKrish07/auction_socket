'use client'

import AdminSideBar from "../admindashboard/AdminSideBar";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMaterials } from "@/store/slices/allDataSlice";


const AdminMaterialList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.allmaterials);

    useEffect(() => {
        //call if allMaterial is empty
        if (data.length === 0) {
            dispatch(fetchAllMaterials());
        }
    },[dispatch, data]);

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap">
                <h6>Material List</h6>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Material Name</th>
                      <th>Tax</th>
                      <th>isActive</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                        !loading && data?.data?.map((material) => {
                            return (
                                <tr key={material.mat_id}>
                                    <td data-label="Material ID">{material.mat_id}</td>
                                    <td data-label="Material Name">{material.mat_name}</td>
                                    <td data-label="Tax">{material.applied_tax}%</td>
                                    <td data-label="isActive">{material.is_active}</td>
                                </tr>
                            )
                        })
                    }

                  </tbody>
                </table>
              </div>
              <div className="row pt-40">
                    <div className="col-lg-12">
                      <div className="custom-pagination-area">
                        <ul>
                          {/* Pagination buttons */}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt;&lt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt; Previous
                            </button>
                          </li>
                          {[0].map((num) => (
                            <li key={num + 1}>
                              <button
                                className={`custom-page-item`}
                              >
                                {num + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              Next &gt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                              disabled
                            >
                              &gt;&gt;
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMaterialList;
