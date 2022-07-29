import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

function Home(props) {
  const url = "/";
  const [moviesList, setMoviesList] = useState([]);
  const released = [];
  const [releasedMovies, setReleasedMovies] = useState([]);
  const genres = [];
  const [genresList, setGenresList] = useState([]);
  const artists = [];
  const first = [];
  const last = [];
  const names = [];
  const [finalNames, setFinalNames] = useState([]);

  async function loadMovies() {
    const rawResponse = await fetch(props.baseUrl + "movies?page=1&limit=20", {
      method: "GET",
    });

    const res = await rawResponse.json();

    res.movies.map((movie) =>
      movie.status === "RELEASED" ? released.push(movie) : null
    );
    setMoviesList(res.movies);
    setReleasedMovies(released);
  }

  async function loadGenres() {
    const rawResponse = await fetch(props.baseUrl + "genres", {
      method: "GET",
    });

    const res = await rawResponse.json();
    res.genres.map((item) => genres.push(item.genre));
    setGenresList(genres);
  }

  async function loadArtists() {
    const rawResponse = await fetch(props.baseUrl + "artists?page=1&limit=20", {
      method: "GET",
    });

    const res = await rawResponse.json();
    res.artists.map((artist) => artists.push(artist));

    artists.map((item) => first.push(item.first_name));

    artists.map((item) => last.push(item.last_name));
    for (var i = 0; i < first.length; i++) {
      names.push(first[i] + " " + last[i]);
    }
    setFinalNames(names);
  }

  useEffect(() => {
    loadMovies();
    loadGenres();
    loadArtists();
    console.log(released);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#42a5f5",
      },
    },
    spacing: 120,
  });

  const [movieName, setMovieName] = useState("");
  const handleMovieName = (e) => {
    setMovieName(e.target.value);
  };

  const handleMovieFilter = (e) => {
    e.preventDefault();

    const filteredMovies = releasedMovies.filter((movie) => {
      return (
        movie.title.toLowerCase() === movieName.toLowerCase() ||
        (movie.release_date >= startDate && movie.release_date <= endDate)
      );
    });

    setReleasedMovies(filteredMovies);
  };

  const [genreName, setGenreName] = React.useState([]);

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenreName(typeof value === "string" ? value.split(",") : value);
    console.log(genreName);
  };

  const [artistName, setArtistName] = React.useState([]);

  const handleArtistChange = (event) => {
    const {
      target: { value },
    } = event;
    setArtistName(typeof value === "string" ? value.split(",") : value);
  };

  const [startDate, setStartDate] = useState("");

  const handleStartDateChange = (e) => {
    e.preventDefault();
    setStartDate(e.target.value);
  };

  const [endDate, setEndDate] = useState("");
  const handleEndDateChange = (e) => {
    e.preventDefault();
    setEndDate(e.target.value);
  };

  return (
    <div>
      <Header buttonHeading="LOGIN" baseUrl={props.baseUrl} url={url} />
      <h2 id="sub-heading">Upcoming Movies</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <ImageList
          cols={6}
          sx={{
            marginTop: 0,
          }}
          style={{ flexWrap: "nowrap", marginRight: "2px" }}
          rowHeight={250}
        >
          {moviesList.map((movie) => (
            <ImageListItem key={movie.id}>
              <img src={movie.poster_url} alt="movie" id="movie-poster" />
              <ImageListItemBar title={movie.title}></ImageListItemBar>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "76vw", margin: "16px" }}>
          <ImageList
            cols={4}
            style={{
              flexWrap: "wrap",
            }}
            rowHeight={350}
          >
            {releasedMovies.map((movie) => (
              <ImageListItem
                key={movie.id}
                style={{ height: "350px", width: "250px", marginRight: 10 }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={movie.poster_url}
                    alt="movie-poster"
                    id="released-movie-poster"
                  />
                </Link>
                <ImageListItemBar
                  title={movie.title}
                  subtitle={<span>Release Date: {movie.release_date}</span>}
                ></ImageListItemBar>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box sx={{ width: "auto", margin: "16px" }}>
          <Card sx={{ border: "1px solid white" }}>
            <CardContent>
              <ThemeProvider theme={theme}>
                <Typography
                  sx={{ fontSize: 14, marginBottom: "10px" }}
                  color="primary"
                >
                  FIND MOVIES BY:
                </Typography>
              </ThemeProvider>
              <FormControl fullWidth>
                <InputLabel>Movie Name</InputLabel>
                <Input
                  type="text"
                  id="movie-name"
                  sx={{ marginLeft: "10px" }}
                  onChange={handleMovieName}
                ></Input>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Genres</InputLabel>
                <Select
                  label="Genres"
                  variant="standard"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={genreName}
                  onChange={handleGenreChange}
                  renderValue={(selected) => selected.join(", ")}
                  sx={{ marginLeft: "10px" }}
                >
                  {genresList.map((genre, index) => (
                    <MenuItem key={index} value={genre}>
                      <Checkbox
                        checked={genreName.indexOf(genre) > -1}
                      ></Checkbox>
                      <span>{genre}</span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Artists</InputLabel>
                <Select
                  label="Artists"
                  variant="standard"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={artistName}
                  onChange={handleArtistChange}
                  renderValue={(selected) => selected.join(", ")}
                  sx={{ marginLeft: "10px" }}
                >
                  {finalNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      <Checkbox
                        checked={artistName.indexOf(name) > -1}
                      ></Checkbox>
                      <span>{name}</span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel shrink={true}>Release Start Date</InputLabel>
                <br />
                <TextField
                  type="date"
                  variant="standard"
                  sx={{ marginLeft: "10px" }}
                  onChange={handleStartDateChange}
                ></TextField>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel shrink={true}>Release End Date</InputLabel>
                <br />
                <TextField
                  type="date"
                  variant="standard"
                  sx={{ marginLeft: "10px" }}
                  onChange={handleEndDateChange}
                ></TextField>
              </FormControl>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              id="apply-btn"
              onClick={handleMovieFilter}
            >
              APPLY
            </Button>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
