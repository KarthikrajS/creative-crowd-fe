import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { mdiStar, mdiStarOutline } from "@mdi/js";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@mdi/react";
// import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import { useParams } from "react-router-dom";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: "900px",
    padding: "1rem",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  ratingStar: {
    marginRight: "0.5rem",
    color: "red",
  },
  bookingBtn: {
    marginBottom: "1rem",
  },
  courses: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: "1rem 0",
  },
}));

const TutorProfilePage = (params) => {
  const param = useParams();
  // console.log(params, param);
  // console.log(param)
  const classes = useStyles();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        console.log(param)
        const res = await axios.get(`/api/tutor/${param.id}`);
        setTutor(res.data.tutor);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };
    fetchTutor();
  }, [param]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <div>
        {/* Hero section */}
        <div
          className="bg-cover bg-center w-full h-64 flex items-center justify-center"
          // style={{ backgroundImage: `url(${tutor.bannerImageUrl})` }}
          style={{
            backgroundImage:
              "url(https://imgs.search.brave.com/s9FzQIR0SleJx44C_PCqc7M8qO7G8CtN4yuiZC0DP98/rs:fit:1518:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/d05kZ3BoQTgtdEhR/b0xmM1dRd293SGFD/VSZwaWQ9QXBp)",
          }}
        >
          <h1 className="text-white text-5xl font-bold">
            {tutor.user.username}
          </h1>
        </div>

        {/* Tutor profile */}
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {tutor.user.username}'s Profile
            </h2>
            <div className="mt-4 space-y-4">
              <div className={classes.root}>
                <div className={classes.rating}>
                  {Array.from(Array(tutor.reviews[0].rating), (e, i) => (
                    <Icon
                      key={i}
                      className={classnames(
                        classes.ratingStar,
                        "text-yellow-400"
                      )}
                      path={mdiStar}
                      size={1}
                    />
                  ))}
                  {Array.from(Array(5 - tutor.reviews[0].rating), (e, i) => (
                    <Icon
                      key={i}
                      className={classnames(
                        classes.ratingStar,
                        "text-gray-300"
                      )}
                      path={mdiStarOutline}
                      size={1}
                    />
                  ))}
                </div>

                <Button
                  className={classes.bookingBtn}
                  variant="contained"
                  color="secondary"
                >
                  Book Now
                </Button>
                <Typography variant="h4" gutterBottom>
                  Courses Offered
                </Typography>
                <div className={classes.courses}>
                  {/* {tutor.courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))} */}
                </div>
                <div>
                  <div>
                    <Typography variant="h4" gutterBottom>
                      Resources
                    </Typography>
                  </div>
                  {tutor.tutor_details &&
                    tutor.tutor_details?.resources.map((resource) => {
                      const url = resource.url;
                      const videoId = url.split("?v=")[1];
                      const getThumbnailUrl = (videoId) => {
                        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                      };
                      return (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          <div className="bg-white overflow-hidden shadow rounded-lg">
                            <a
                              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                              target="_blank"
                            >
                              <img
                                src={getThumbnailUrl(videoId)}
                                alt="Video thumbnail"
                                className="w-full"
                              />
                            </a>
                            <div className="p-4">
                              <h2 className="font-medium text-lg mb-2">
                                {resource.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorProfilePage;
