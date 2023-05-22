import axios from "axios";

// export const getStudents = () => {
//    axios
//     .get(`/api/student`)
//     .then((res) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

export default {
  student: {
    getAllStudents: () => axios.get(`/api/student`).then((res) => res.data),
  },
};
