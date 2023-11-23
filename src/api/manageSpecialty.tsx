import http from "../../../client/src/utils/http";

const manageSpecialtyApi = {
    getAllSpecialties: () => {
        return http.get("/specialties");
    },
    createSpecialty: (body: any) => {
        return http.post("/specialties/new", body);
    },
};

export default manageSpecialtyApi;