import http from "../../../client/src/utils/http";

const manageUserApi = {
    getAllUsers: () => {
        return http.get("/admin/manage-user");
    }
};

export default manageUserApi;