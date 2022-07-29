import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import "./Details.css";
import { Link } from "react-router-dom";

function Details(props) {
  const [movie, setMovie] = useState([]);
  const genres = [];
  const [movieGenres, setMovieGenres] = useState([]);
  const artists = [];
  const artistsProfile = [];
  const [artistsProfileUrl, setArtitsProfileUrl] = useState([]);
  const first = [];
  const last = [];
  const names = [];
  const [finalNames, setFinalNames] = useState([]);
  const [trailer, setTrailer] = useState("");
  useEffect(() => {
    async function loadMovieDetails() {
      const response = await fetch(
        props.baseUrl + "movies/" + props.match.params.id,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      setMovie(res);
      res.genres.map((genre) => genres.push(genre));
      setMovieGenres(genres);
      res.artists.map((artist) => artists.push(artist));
      artists.map((item) => artistsProfile.push(item.profile_url));
      artists.map((item) => first.push(item.first_name));
      artists.map((item) => last.push(item.last_name));
      setArtitsProfileUrl(artistsProfile);
      for (var i = 0; i < first.length; i++) {
        names.push(first[i] + " " + last[i]);
      }
      setFinalNames(names);
      setTrailer(res.trailer_url);
    }
    loadMovieDetails();
  }, []);
  const icon = "<";
  var trailerId = trailer.split("=");
  var newTrailerUrl = "https://www.youtube.com/embed/" + trailerId[1];

  const [toggle1, setToggle1] = React.useState(false);
  const toggleButton1 = () => setToggle1(!toggle1);
  const [toggle2, setToggle2] = React.useState(false);
  const toggleButton2 = () => setToggle2(!toggle2);
  const [toggle3, setToggle3] = React.useState(false);
  const toggleButton3 = () => setToggle3(!toggle3);
  const [toggle4, setToggle4] = React.useState(false);
  const toggleButton4 = () => setToggle4(!toggle4);
  const [toggle5, setToggle5] = React.useState(false);
  const toggleButton5 = () => setToggle5(!toggle5);

  return (
    <div>
      <Header
        buttonHeading="LOGIN"
        id={props.match.params.id}
        baseUrl={props.baseUrl}
      />
      <div className="back-btn">
        <Typography className="back-button">
          <Link to="/" style={{ textDecoration: "none" }}>
            {icon}Back To Home
          </Link>
        </Typography>
      </div>
      <div className="sub-container">
        <div className="movie-poster">
          <img src={movie.poster_url} alt="movie-poster" id="poster"></img>
        </div>
        <div className="movie-details">
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>
              <b>Genre:&nbsp;</b>
              <span>{movieGenres.join(", ")}</span>
            </p>
            <p>
              <b>Duration:&nbsp;</b>
              {movie.duration}
            </p>
            <p>
              <b>Release Date:&nbsp;</b>
              {movie.release_date}
            </p>
            <p>
              <b>Rating:&nbsp;</b>
              {movie.rating}
            </p>
            <br />
            <br />
            <p style={{ width: "800px" }}>
              <b>
                Plot:
                <a href={movie.wiki_url} style={{ textDecoration: "none" }}>
                  (Wiki-Link)&nbsp;&nbsp;
                </a>
              </b>
              <span>{movie.storyline}</span>
            </p>
          </div>
          <div className="trailer">
            <p>
              <b>Trailer:</b>
            </p>
            <iframe
              width="800"
              height="400"
              src={newTrailerUrl}
              title="movie-trailer"
            ></iframe>
          </div>
        </div>
        <div className="rating-artists-details">
          <div className="ratings">
            <p>
              <b>Rate this movie:</b>
            </p>
            <StarBorderOutlinedIcon
              style={{ color: toggle1 ? "yellow" : "black" }}
              onClick={toggleButton1}
            />
            <StarBorderOutlinedIcon
              style={{ color: toggle2 ? "yellow" : "black" }}
              onClick={toggleButton2}
            />
            <StarBorderOutlinedIcon
              style={{ color: toggle3 ? "yellow" : "black" }}
              onClick={toggleButton3}
            />
            <StarBorderOutlinedIcon
              style={{ color: toggle4 ? "yellow" : "black" }}
              onClick={toggleButton4}
            />
            <StarBorderOutlinedIcon
              style={{ color: toggle5 ? "yellow" : "black" }}
              onClick={toggleButton5}
            />
          </div>
          <div className="artists">
            <Typography>
              <b>Artists:</b>
            </Typography>
            <Box>
              <ImageList
                sx={{
                  marginTop: 0,
                }}
              >
                {artistsProfileUrl.map((item, index) => (
                  <ImageListItem key={index} style={{ width: 120 }}>
                    <img src={item} alt="movie" id="artist-poster" />
                    {finalNames.map((name, ind) =>
                      index === ind ? (
                        <ImageListItemBar
                          key={ind}
                          title={name}
                        ></ImageListItemBar>
                      ) : null
                    )}
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
