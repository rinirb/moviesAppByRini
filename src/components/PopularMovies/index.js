import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import MovieCard from '../MovieCard'

import Footer from '../Footer'

import './index.css'

const popularMoviesContentStatusConstants = {
  initial: 'INITIAL',
  search: 'SEARCH',
  noresults: 'NORESULTS',
  loading: 'LOADING',
}

class PopularMovies extends Component {
  state = {
    popularMoviesList: [],
    totalPages: null,
    pageNumber: 1,
    popularMoviesContentStatus: popularMoviesContentStatusConstants.initial,
    searchMovie: '',
    searchedMovieDetails: [],
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  onClickPreviousPage = () => {
    const {pageNumber, popularMoviesContentStatus} = this.state

    if (
      pageNumber - 1 > 0 &&
      popularMoviesContentStatus === popularMoviesContentStatusConstants.initial
    ) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber - 1,
        }),
        this.getPopularMoviesList,
      )
    }
    if (
      pageNumber - 1 > 0 &&
      popularMoviesContentStatus === popularMoviesContentStatusConstants.search
    ) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber - 1,
        }),
        this.getSearchedMovies,
      )
    }
  }

  onClickNextPage = () => {
    const {totalPages, pageNumber, popularMoviesContentStatus} = this.state
    if (
      pageNumber + 1 <= totalPages &&
      popularMoviesContentStatus === popularMoviesContentStatusConstants.initial
    ) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber + 1,
        }),
        this.getPopularMoviesList,
      )
    }
    if (
      pageNumber + 1 <= totalPages &&
      popularMoviesContentStatus === popularMoviesContentStatusConstants.search
    ) {
      this.setState(
        previousState => ({
          pageNumber: previousState.pageNumber + 1,
        }),
        this.getSearchedMovies,
      )
    }
  }

  getPopularMoviesList = async () => {
    this.setState({
      popularMoviesContentStatus: popularMoviesContentStatusConstants.loading,
    })
    const {pageNumber} = this.state
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=c06d8d65ccfbe1695147635adf8a5100&language=en-US&page=${pageNumber}&include_adult=false`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const totalPages = data.total_pages

    const popularMoviesList = data.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: eachMovie.poster_path,
    }))

    this.setState({
      popularMoviesList,
      totalPages,
      popularMoviesContentStatus: popularMoviesContentStatusConstants.initial,
    })
  }

  onSearchMovie = searchMovie => {
    this.setState(
      {
        searchMovie,
      },
      this.getSearchedMovies,
    )
  }

  getSearchedMovies = async () => {
    this.setState({
      popularMoviesContentStatus: popularMoviesContentStatusConstants.loading,
    })
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
          popularMoviesContentStatus:
            popularMoviesContentStatusConstants.search,
        })
      } else {
        this.setState({
          popularMoviesContentStatus:
            popularMoviesContentStatusConstants.noresults,
        })
      }
    } else {
      this.setState({
        popularMoviesContentStatus: popularMoviesContentStatusConstants.initial,
      })
    }
  }

  renderSearchedMovies = () => {
    const {searchedMovieDetails, pageNumber, totalPages} = this.state
    return (
      <>
        <div className="popular-search-movies-container">
          <ul className="popular-search-movies-list-container">
            {searchedMovieDetails.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
          <div className="popular-search-movie-page-details-container">
            <button
              type="button"
              className="popular-search-movie-page-navigation-button popular-search-movie-page-backward-button"
              onClick={this.onClickPreviousPage}
            >
              &lt;
            </button>
            <h1 className="popular-search-movie-page-number">
              {pageNumber} of {totalPages}
            </h1>
            <button
              type="button"
              className="popular-search-movie-page-navigation-button popular-search-movie-page-forward-button"
              onClick={this.onClickNextPage}
            >
              &gt;
            </button>
          </div>
        </div>
      </>
    )
  }

  renderNoResultsPage = () => {
    const {searchMovie} = this.state
    return (
      <div className="popular-search-movie-no-results-container">
        <div className="popular-search-movie-no-results-text-container">
          <h1 className="popular-search-movie-no-results-text">Uh oh!</h1>
          <p className="popular-search-movie-no-results-text">
            Your search for {searchMovie} did not find any matches.
          </p>
        </div>
      </div>
    )
  }

  renderLoadingPage = () => (
    <div className="popular-loading-page-container">
      <div testid="loader" className="popular-loader-container">
        <Loader type="Oval" color="#E50014" height={50} width={50} />
      </div>
    </div>
  )

  renderPopularMovies = () => {
    const {popularMoviesList, totalPages, pageNumber} = this.state
    return (
      <div className="popular-movie-data-container">
        <ul className="popular-movie-data-list-container">
          {popularMoviesList.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        <div className="popular-movie-page-details-container">
          <button
            type="button"
            className="popular-movie-page-navigation-button popular-movie-page-backward-button"
            onClick={this.onClickPreviousPage}
          >
            &lt;
          </button>
          <h1 className="popular-movie-page-number">
            {pageNumber} of {totalPages}
          </h1>
          <button
            type="button"
            className="popular-movie-page-navigation-button popular-movie-page-forward-button"
            onClick={this.onClickNextPage}
          >
            &gt;
          </button>
        </div>
      </div>
    )
  }

  renderCurrentPage() {
    const {popularMoviesContentStatus} = this.state

    switch (popularMoviesContentStatus) {
      case popularMoviesContentStatusConstants.initial:
        return this.renderPopularMovies()
      case popularMoviesContentStatusConstants.search:
        return this.renderSearchedMovies()
      case popularMoviesContentStatusConstants.noresults:
        return this.renderNoResultsPage()
      case popularMoviesContentStatusConstants.loading:
        return this.renderLoadingPage()
      default:
        return null
    }
  }

  render() {
    const {searchMovie, popularMoviesContentStatus} = this.state
    let footerClassName
    if (
      popularMoviesContentStatus ===
      popularMoviesContentStatusConstants.noresults
    ) {
      footerClassName = 'popular-movies-hide-footer'
    }
    return (
      <div className="home-bg-container">
        <div className="home-navbar-originals-container">
          <div className="home-navbar-container">
            <Navbar
              onSearchMovie={this.onSearchMovie}
              searchMovie={searchMovie}
              selectedPage="popular"
            />
          </div>
          <div>{this.renderCurrentPage()}</div>
          <div className={footerClassName}>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default PopularMovies
