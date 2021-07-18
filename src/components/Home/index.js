import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import TrendingNow from '../TrendingNow'

import TopRated from '../TopRated'

import Originals from '../Originals'

import MovieCard from '../MovieCard'

import Footer from '../Footer'

import './index.css'

const homePageContentStatusConstants = {
  initial: 'INITIAL',
  search: 'SEARCH',
  noresults: 'NORESULTS',
}

class Home extends Component {
  state = {
    originalsMovieDetails: [],
    originalsDataAvailable: false,
    totalPages: null,
    pageNumber: 1,
    homePageContentStatus: homePageContentStatusConstants.initial,
    searchMovie: '',
    searchedMovieDetails: [],
  }

  componentDidMount() {
    this.getRandomOriginals()
  }

  onSearchMovie = searchMovie => {
    this.setState(
      {
        searchMovie,
      },
      this.getSearchedMovies,
    )
  }

  getRandomOriginals = async () => {
    const url =
      'https://api.themoviedb.org/3/discover/tv?api_key=c06d8d65ccfbe1695147635adf8a5100&include_adult=false'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const originalsMovieDetails = data.results.map(eachMovie => {
      if (eachMovie.original_name !== undefined) {
        return {
          id: eachMovie,
          title: eachMovie.original_name,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
        }
      }
      return {
        id: eachMovie,
        title: eachMovie.original_title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
      }
    })

    const randomOriginalPosterNumber = Math.floor(
      Math.random() * originalsMovieDetails.length,
    )

    this.setState(
      {
        originalsMovieDetails,
        originalsDataAvailable: true,
        randomOriginalPosterNumber,
      },
      this.renderRandomOriginals,
    )
  }

  renderRandomOriginals = () => {
    const {
      originalsMovieDetails,
      randomOriginalPosterNumber,
      originalsDataAvailable,
    } = this.state

    let originalsTopPosterDetails =
      originalsMovieDetails[randomOriginalPosterNumber]

    if (originalsDataAvailable === false) {
      this.getRandomOriginals()
    }
    originalsTopPosterDetails =
      originalsMovieDetails[randomOriginalPosterNumber]
    const {title, overview, posterPath} = originalsTopPosterDetails

    const isValidPath = posterPath !== null
    return (
      <div>
        {isValidPath ? (
          <div className="home-random-originals-container">
            <div className="home-random-originals-details-container">
              <div className="home-random-originals-detail-container">
                <h1 className="home-random-original-title">{title}</h1>
                <p className="home-random-original-overview">{overview}</p>
                <button className="home-random-original-button" type="button">
                  Play
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  renderDefaultMovies = () => {
    const {originalsDataAvailable} = this.state
    return (
      <>
        <div>
          {originalsDataAvailable ? (
            this.renderRandomOriginals()
          ) : (
            <div className="home-movie-loading-container">
              <div className="home-movie-loading-bg-container" testid="loader">
                <Loader type="Oval" color="#E50014" height={50} width={50} />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  getSearchedMovies = async () => {
    const {searchMovie, pageNumber} = this.state
    if (searchMovie !== '') {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=c06d8d65ccfbe1695147635adf8a5100&language=en-US&query=${searchMovie}&page=${pageNumber}&include_adult=false`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()

      const totalPages = data.total_pages

      const searchedMovieDetails = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }))

      const numberOfSearchResults = searchedMovieDetails.length
      if (numberOfSearchResults !== 0) {
        this.setState({
          searchedMovieDetails,
          totalPages,
          homePageContentStatus: homePageContentStatusConstants.search,
        })
      } else {
        this.setState({
          homePageContentStatus: homePageContentStatusConstants.noresults,
        })
      }
    } else {
      this.setState({
        homePageContentStatus: homePageContentStatusConstants.initial,
      })
    }
  }

  onClickPreviousPage = () => {
    const {pageNumber} = this.state
    if (pageNumber - 1 > 0) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber - 1,
        }),
        this.getSearchedMovies,
      )
    }
  }

  onClickNextPage = () => {
    const {totalPages, pageNumber} = this.state
    if (pageNumber + 1 <= totalPages) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber + 1,
        }),
        this.getSearchedMovies,
      )
    }
  }

  renderSearchedMovies = () => {
    const {searchedMovieDetails, pageNumber, totalPages} = this.state
    return (
      <div className="home-search-movies-container">
        <ul className="home-search-movies-list-container">
          {searchedMovieDetails.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        <div className="home-search-movie-page-details-container">
          <button
            type="button"
            className="home-search-movie-page-navigation-button home-search-movie-page-backward-button"
            onClick={this.onClickPreviousPage}
          >
            &lt;
          </button>
          <h1 className="home-search-movie-page-number">
            {pageNumber} of {totalPages}
          </h1>
          <button
            type="button"
            className="home-search-movie-page-navigation-button home-search-movie-page-forward-button"
            onClick={this.onClickNextPage}
          >
            &gt;
          </button>
        </div>
      </div>
    )
  }

  renderNoResultsPage = () => {
    const {searchMovie} = this.state
    return (
      <div className="home-search-movie-no-results-container">
        <div className="home-search-movie-no-results-text-container">
          <h1 className="home-search-movie-no-results-text">Uh oh!</h1>
          <p className="home-search-movie-no-results-text">
            Your search for {searchMovie} did not find any matches.
          </p>
        </div>
      </div>
    )
  }

  renderCurrentPage = () => {
    const {homePageContentStatus} = this.state

    switch (homePageContentStatus) {
      case homePageContentStatusConstants.initial:
        return this.renderDefaultMovies()
      case homePageContentStatusConstants.search:
        return this.renderSearchedMovies()
      case homePageContentStatusConstants.noresults:
        return this.renderNoResultsPage()
      default:
        return null
    }
  }

  render() {
    const {
      searchMovie,
      homePageContentStatus,
      randomOriginalPosterNumber,
      originalsDataAvailable,
      originalsMovieDetails,
    } = this.state

    let footerClassName
    if (homePageContentStatus === homePageContentStatusConstants.noresults) {
      footerClassName = 'home-hide-footer'
    }

    let urlPath
    let navbarOpacityClassName
    if (
      originalsDataAvailable &&
      homePageContentStatus === homePageContentStatusConstants.initial
    ) {
      const originalsTopPosterDetails =
        originalsMovieDetails[randomOriginalPosterNumber]
      const {posterPath} = originalsTopPosterDetails
      urlPath = `https://image.tmdb.org/t/p/original${posterPath}`
      navbarOpacityClassName = 'home-navbar-container-with-opacity'
    }

    let homePageContainerClassName
    if (homePageContentStatus !== homePageContentStatusConstants.initial) {
      homePageContainerClassName = 'home-bg-container-with-bg-color'
    }

    return (
      <div className={`home-bg-container ${homePageContainerClassName}`}>
        <div
          className="home-random-original-container"
          style={{
            backgroundImage: `url(
            ${urlPath}
          )`,
            backgroundSize: 'cover',
          }}
        >
          <div className={`home-navbar-container ${navbarOpacityClassName}`}>
            <Navbar
              onSearchMovie={this.onSearchMovie}
              searchMovie={searchMovie}
              selectedPage="home"
            />
          </div>
          <div>{this.renderCurrentPage()}</div>
        </div>
        {homePageContentStatus === homePageContentStatusConstants.initial && (
          <div className="home-trending-popular-originals-container">
            <TrendingNow />
            <TopRated />
            <Originals />
          </div>
        )}
        <div className={footerClassName}>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
