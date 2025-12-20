import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const [role, setRole] = useState("user");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRoleLoading(false);
        return;
      }

      try {
        const res = await axiosSecure.get(`/users/${user.email}`); 
        console.log(res.data)
        setRole(res.data?.role || "");

      } catch (err) {
        console.error("Error fetching user role:", err);
        setRole("user");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
