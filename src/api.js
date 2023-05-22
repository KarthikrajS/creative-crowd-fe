import axios from "axios";

export default {
  student: {
    getAllStudents: (id) =>
      axios.get(`/api/student/not-friends/${id}`).then((res) => res.data),
    getFriends: (id) =>
      axios.get(`/api/student/friends/${id}`).then((res) => res.data),
    addFriend: (data) =>
      axios.post(`/api/student/addFriend`, data).then((res) => res.data),
    addResource: (data) =>
      console.log(data) ||
      axios.post(`/api/resource/${data.id}/createResource`, data),
    upgradeTutor: (data) => axios.post("/api/tutor", data),
    getStudent: (data) => axios.get(`/api/student/${data}`),
    saveBooking: (data) => axios.post(`/api/student/bookSession`, data),
    getBooking: (id) => axios.get(`/api/student/getBookedSession/${id}`),
    getMeetingDetails: (id) =>
      axios.get(`/api/student/getMeetingDetails/${id}`),
  },
  tutor: {
    getAllSubjects: () => axios.get("/api/student/subjects"),
    getAllTutors: () => axios.get("api/tutor/"),
  },
  interest: {
    getInterests: () => axios.get("/api/interest/"),
  },
  // zoom: {
  //   getToken: (meetingArgs) =>
  //     axios.post(
  //       "/api/zoom/generate",
  //       { body: JSON.stringify(meetingArgs) },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ),
  // },
};
