import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure()

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
      const res = await axiosSecure.get(`/applications/${user.email}`);
      setApplications(res.data.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    if (status === "Pending")
      return <span className="badge badge-warning dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700">Pending</span>;
    if (status === "Approved")
      return <span className="badge badge-success dark:bg-green-900/30 dark:text-green-400 dark:border-green-700">Approved</span>;
    return <span className="badge badge-error dark:bg-red-900/30 dark:text-red-400 dark:border-red-700">Rejected</span>;
  };

  // DELETE application
  const handleDelete = async (id, status) => {
    if (status === "Approved") return;

    const isDark = document.documentElement.classList.contains('dark');
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot recover this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#000000',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/applications/delete/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Application removed.",
        icon: "success",
        background: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f3f4f6' : '#000000',
      });
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE application
  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/applications/update/${editingApp._id}`, { expectedSalary: editSalary });

      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        title: "Updated!",
        text: "Application updated successfully.",
        icon: "success",
        background: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f3f4f6' : '#000000',
      });

      setEditingApp(null);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto dark:bg-gray-900">
      <title>My Applications | e-TuitionBD</title>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-base-100 dark:bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Applications Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">You haven't applied to any tuitions.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
              <tr>
                <th className="dark:text-gray-300">#</th>
                <th className="dark:text-gray-300">Subject</th>
                <th className="dark:text-gray-300">Class</th>
                <th className="dark:text-gray-300">Location</th>
                <th className="dark:text-gray-300">Expected Salary</th>
                <th className="dark:text-gray-300">Status</th>
                <th className="dark:text-gray-300">Applied At</th>
                <th className="text-center dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="hover dark:hover:bg-gray-700/50 text-sm dark:text-gray-300">
                  <td className="dark:text-gray-300">{index + 1}</td>
                  <td className="font-bold dark:text-white">{app.subject}</td>
                  <td className="dark:text-gray-300">{app.class}</td>
                  <td className="dark:text-gray-300">{app.location}</td>

                  <td className="font-bold text-green-600 dark:text-green-400">
                    ৳{app.expectedSalary}
                  </td>

                  <td>{statusBadge(app.status)}</td>

                  <td className="text-gray-600 dark:text-gray-400">
                    {new Date(app.appliedAt).toLocaleString()}
                  </td>

                  <td className="flex gap-2 justify-center">
                    {/* EDIT button (disabled if Approved) */}
                    <button
                      className="btn btn-sm btn-info dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:border-blue-600"
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
                      className="btn btn-sm btn-error dark:bg-red-600 dark:hover:bg-red-700 dark:text-white dark:border-red-600"
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
        <div className="modal modal-open bg-black/30 dark:bg-black/60">
          <div className="modal-box max-w-md p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Edit Application
            </h3>

            <div className="form-control w-full space-y-3">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                  Expected Salary (৳)
                </span>
              </label>

              <input
                type="number"
                value={editSalary}
                onChange={(e) => setEditSalary(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter new expected salary"
              />
            </div>

            <div className="modal-action mt-6 flex justify-end gap-3">
              <button
                className="btn px-5 py-2 rounded-lg border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600"
                onClick={() => setEditingApp(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary px-5 py-2 rounded-lg shadow-md dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:border-blue-600"
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
