import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRoleLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/users/${user.email}`); 

        setRole(res.data?.role || "");

      } catch (err) {
        console.error("Error fetching user role:", err);
        setRole("user");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
