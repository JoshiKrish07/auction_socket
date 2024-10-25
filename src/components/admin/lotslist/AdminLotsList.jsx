'use client'

import AdminSideBar from "../admindashboard/AdminSideBar";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLots } from "@/store/slices/allDataSlice";
import Link from "next/link";
import './AdminLotsList.css';
import DeleteButton from "@/components/swal-fire-model/DeleteButton";
import { toast } from "react-toastify";

const AdminLotsList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.alllots);

    useEffect(() => {
        //call if allLots is empty
        if (data.length === 0) {
            dispatch(fetchAllLots());
        }
    },[dispatch, data]);

    const handleDelete = async (lotId) => {

      const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Session Expired, Please Login", { position: "top-right" });
            setLoading(false);
            return router.push("/admin");
        }

      try {
        const res = await fetch(`/api/admin/delete-lot/${lotId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data.message);
          toast.success(data.message, {position: 'top-right'});
          dispatch(fetchAllLots());
        } else {
          const errorData = await res.json();
          console.error('Error:', errorData.message);
          toast.error(errorData.message, {position: 'top-right'});
        }
      } catch (error) {
        console.error('Request failed:', error);
        toast.error("Something Went Wrong", {position: 'top-right'});
      }
    }

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap">
              <div className="auct-header">
                <h6>Lots List</h6>
                <Link href='/admin/add_lots'>
                  <button className="btn btn primary" style={{backgroundColor:'#0d6efd'}}>Add Lot</button>
                </Link>
                </div>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Lot ID</th>
                      <th>Lot Image</th>
                      <th>Lot Code</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                        {
                                !loading && data?.data?.map((lot) => {
                                    return (
                                        <tr key={lot.lot_id}>
                                            <td data-label="Lot ID">{lot.lot_id}</td>
                                            <td data-label="Lot Image"><img width='40px' src={`/${lot.lot_img_1}`} /></td>
                                            <td data-label="Lot Code">{lot.lot_code}</td>
                                            <td data-label="Action">
                                              <Link href={`/admin/edit-lot/${lot.lot_id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                              </Link>
                                              &nbsp;
                                              <DeleteButton itemId={lot.lot_id} onDelete={handleDelete} />
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

export default AdminLotsList;
