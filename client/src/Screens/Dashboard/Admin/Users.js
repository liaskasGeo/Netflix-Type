import React, { useEffect } from "react";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../Redux/Actions/UserActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.getAllUsers
  );
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.deleteUser
  );

  // admin delete user handler
  const adminDeleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  useEffect(() => {
    // get all liked movies
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>

        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={adminDeleteUserHandler}
          />
        ) : (
          <Empty message="You have no favorites movies" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
