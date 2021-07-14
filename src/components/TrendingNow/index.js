import {Component} from 'react'

import Slider from 'react-slick'

import MovieCard from '../MovieCard'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
  ],
}

class TrendingNow extends Component {
  state = {trendingMoviesList: []}

  componentDidMount() {
    this.getTrendingNowMovies()
  }

  getTrendingNowMovies = async () => {
    const url =
      'https://api.themoviedb.org/3/trending/all/day?api_key=c06d8d65ccfbe1695147635adf8a5100&include_adult=false'
    const response = await fetch(url)
    const data = await response.json()

    const trendingMoviesList = data.results.map(eachMovie => {
      if (eachMovie.original_name !== undefined) {
        return {
          id: eachMovie.id,
          title: eachMovie.original_name,
          posterPath: eachMovie.poster_path,
        }
      }
      return {
        id: eachMovie.id,
        title: eachMovie.original_title,
        posterPath: eachMovie.poster_path,
      }
    })

    this.setState({trendingMoviesList})
  }

  render() {
    const {trendingMoviesList} = this.state
    return (
      <div className="trending-now-bg-container">
        <h1 className="trending-now-title">Trending Now</h1>

        <ul className="trending-now-list-container">
          <Slider {...settings} className="trending-now-slider">
            {trendingMoviesList.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
}

export default TrendingNow
