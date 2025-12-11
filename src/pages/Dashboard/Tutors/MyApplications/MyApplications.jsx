import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // For edit modal
  const [editingApp, setEditingApp] = useState(null);
  const [editSalary, setEditSalary] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/applications/${user.email}`
      );
      setApplications(res.data.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    if (status === "Pending")
      return <span className="badge badge-warning">Pending</span>;
    if (status === "Approved")
      return <span className="badge badge-success">Approved</span>;
    return <span className="badge badge-error">Rejected</span>;
  };

  // DELETE application
  const handleDelete = async (id, status) => {
    if (status === "Approved") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot recover this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/applications/delete/${id}`);
      Swal.fire("Deleted!", "Application removed.", "success");
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE application
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/applications/update/${editingApp._id}`,
        { expectedSalary: editSalary }
      );

      Swal.fire("Updated!", "Application updated successfully.", "success");

      setEditingApp(null);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Applications Found
          </h3>
          <p className="text-gray-500">You haven't applied to any tuitions.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Location</th>
                <th>Expected Salary</th>
                <th>Status</th>
                <th>Applied At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="hover text-sm">
                  <td>{index + 1}</td>
                  <td className="font-bold">{app.subject}</td>
                  <td>{app.class}</td>
                  <td>{app.location}</td>

                  <td className="font-bold text-green-600">
                    ৳{app.expectedSalary}
                  </td>

                  <td>{statusBadge(app.status)}</td>

                  <td className="text-gray-600">
                    {new Date(app.appliedAt).toLocaleString()}
                  </td>

                  <td className="flex gap-2 justify-center">
                    {/* EDIT button (disabled if Approved) */}
                    <button
                      className="btn btn-sm btn-info"
                      disabled={app.status === "Approved"}
                      onClick={() => {
                        setEditingApp(app);
                        setEditSalary(app.expectedSalary);
                      }}
                    >
                      Edit
                    </button>

                    {/* DELETE button (disabled if Approved) */}
                    <button
                      className="btn btn-sm btn-error"
                      disabled={app.status === "Approved"}
                      onClick={() => handleDelete(app._id, app.status)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingApp && (
        <div className="modal modal-open bg-black/30">
          <div className="modal-box max-w-md p-6 rounded-xl shadow-xl border border-gray-200">

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Application
            </h3>

            <div className="form-control w-full space-y-3">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Expected Salary (৳)
                </span>
              </label>

              <input
                type="number"
                value={editSalary}
                onChange={(e) => setEditSalary(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new expected salary"
              />
            </div>

            <div className="modal-action mt-6 flex justify-end gap-3">
              <button
                className="btn px-5 py-2 rounded-lg border-gray-300 hover:bg-gray-100"
                onClick={() => setEditingApp(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary px-5 py-2 rounded-lg shadow-md"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyApplications;
