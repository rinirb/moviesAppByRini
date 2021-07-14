import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import MovieCard from '../MovieCard'

import './index.css'

const initialValues = {
  id: null,
  posterPath: '',
  title: '',
  overview: '',
  budget: null,
  releaseDate: '',
  genres: [],
  audioAvailable: [],
  isDataFetched: false,
}

class SpecificMovie extends Component {
  state = {
    specificMovieDetails: initialValues,
    similarMovieDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getSpecificMovieDetails()
    this.getSimilarMovieDetails()
  }

  getSpecificMovieDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {id} = match.params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c06d8d65ccfbe1695147635adf8a5100&language=en-US&include_adult=false`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()

    const genresList = data.genres.map(eachGenre => ({
      genreName: eachGenre.name,
    }))
    const languageList = data.spoken_languages.map(eachLanguage => ({
      spokenLanguage: eachLanguage.name,
    }))
    const specificMovieDetails =
      data.title !== undefined
        ? {
            id: data.id,
            posterPath: data.poster_path,
            title: data.title,
            overview: data.overview,
            budget: data.budget,
            releaseDate: data.release_date,
            ratingCount: data.vote_count,
            ratingAverage: data.vote_average,
          }
        : {
            id: data.id,
            posterPath: data.poster_path,
            title: data.original_title,
            overview: data.overview,
            budget: data.budget,
            releaseDate: data.release_date,
            ratingCount: data.vote_count,
            ratingAverage: data.vote_average,
          }
    specificMovieDetails.genres = genresList
    specificMovieDetails.audioAvailable = languageList

    this.setState({specificMovieDetails, isLoading: false})
  }

  getSimilarMovieDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c06d8d65ccfbe1695147635adf8a5100&language=en-US&page=1&include_adult=false`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const similarMovieDetails = data.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: eachMovie.poster_path,
    }))
    this.setState({similarMovieDetails})
  }

  render() {
    const {specificMovieDetails, similarMovieDetails, isLoading} = this.state

    const {
      posterPath,
      title,
      overview,
      audioAvailable,
      budget,
      releaseDate,
      genres,
      ratingCount,
      ratingAverage,
    } = specificMovieDetails
    const urlPath = `https://image.tmdb.org/t/p/original/${posterPath}`
    const isSimilarMoviesPresent = similarMovieDetails.length > 0

    return (
      <div className="specific-movie-bg-container">
        {isLoading ? (
          <>
            <div className="specific-movie-navbar-container">
              <Navbar />
            </div>
            <div
              className="specific-movie-loading-bg-container"
              testid="loader"
            >
              <Loader type="Oval" color="#E50014" height={50} width={50} />
            </div>
          </>
        ) : (
          <div>
            <div
              className="specific-movie-data-bg-container"
              style={{backgroundImage: `url(${urlPath})`}}
            >
              <div className="specific-movie-navbar-container">
                <Navbar />
              </div>
              <div className="specific-movie-datas-container">
                <div className="specific-movie-data-container">
                  <h1 className="specific-movie-title">{title}</h1>
                  <p className="specific-movie-overview">{overview}</p>
                  <button className="specific-movie-button" type="button">
                    Play
                  </button>
                </div>
              </div>
            </div>
            <div className="specific-movie-details-container">
              <div className="specific-movie-detail-container">
                <h1 className="specific-movie-detail-title">Genres</h1>
                <ul className="specific-movie-detail-list-container">
                  {genres.map(eachGenre => (
                    <li
                      className="specific-movie-detail-item"
                      key={eachGenre.genreName}
                    >
                      {eachGenre.genreName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="specific-movie-detail-container">
                <h1 className="specific-movie-detail-title">Audio Available</h1>
                <ul className="specific-movie-detail-list-container">
                  {audioAvailable.map(eachAudio => (
                    <li
                      className="specific-movie-detail-item"
                      key={eachAudio.spokenLanguage}
                    >
                      {eachAudio.spokenLanguage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="specific-movie-detail-container">
                <h1 className="specific-movie-detail-title">Rating Count</h1>
                <p className="specific-movie-detail-item">{ratingCount}</p>
                <h1 className="specific-movie-detail-title">Rating Average</h1>
                <p className="specific-movie-detail-item">{ratingAverage}</p>
              </div>

              <div className="specific-movie-detail-container">
                <h1 className="specific-movie-detail-title">Budget</h1>
                <p className="specific-movie-detail-item">{budget}</p>
                <h1 className="specific-movie-detail-title">Release Date</h1>
                <p className="specific-movie-detail-item">{releaseDate}</p>
              </div>
            </div>

            <div className="specific-movie-more-like-this-container">
              {isSimilarMoviesPresent && (
                <>
                  <h1 className="specific-movie-more-like-this-title">
                    More like this
                  </h1>
                  <ul className="specific-movie-more-like-this-list-container">
                    {similarMovieDetails.map(eachMovie => (
                      <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SpecificMovie
