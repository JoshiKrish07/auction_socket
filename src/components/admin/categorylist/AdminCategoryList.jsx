'use client'

import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { fetchAllCategories } from "@/store/slices/allDataSlice";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";

const AdminCategoryList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.allcategories);

    useEffect(() => {
        //call if allCategories is empty
        if (data.length === 0) {
            dispatch(fetchAllCategories());
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
                <h6>Category List</h6>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Category ID</th>
                      <th>Category Name</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                        !loading && data?.data?.map((category) => {
                            return (
                                <tr key={category.cat_id}>
                                    <td data-label="Auction ID">{category.cat_id}</td>
                                    <td data-label="Name">{category.cat_name}</td>
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

export default AdminCategoryList;
