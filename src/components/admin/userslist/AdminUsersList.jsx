'use client'

import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { useEffect } from "react";
import { fetchAllUsers } from "@/store/slices/allDataSlice";
import Shimmer from "@/components/shimmer-ui/Shimmer";
import Loader from "@/components/loader/Loader";

const AdminUsersList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.allusers);

    useEffect(() => {
        
        //call if allusers is empty
        if (data.length === 0) {
            dispatch(fetchAllUsers());
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
                <h6>Users List</h6>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Handle Name</th>
                      <th>Name</th>
                      <th>E-Mail</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        !loading && data?.data?.map((user) => {
                            return (
                                    <tr key={user.id}>
                                            <td data-label="ID">{user.id}</td>
                                            <td data-label="Name">{user.handlename}</td>
                                            <td data-label="Name">{user.name}</td>
                                            <td data-label="E-Mail">{user.email}</td>
                                            {/* <td data-label="Status">
                                                <span>Winning</span>
                                            </td> */}
                                            <td data-label="Address">{user.address}</td>
                                            <td data-label="Action">
                                              <button className="btn btn-primary">Edit</button>
                                            </td>
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

export default AdminUsersList;