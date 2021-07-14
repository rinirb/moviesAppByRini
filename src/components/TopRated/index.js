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

class TopRated extends Component {
  state = {topRatedMovieList: []}

  componentDidMount() {
    this.getTopRatedMovieList()
  }

  getTopRatedMovieList = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/top_rated?api_key=c06d8d65ccfbe1695147635adf8a5100&language=en-US&include_adult=false'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const topRatedMovieList = data.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      posterPath: eachMovie.poster_path,
    }))

    this.setState({topRatedMovieList})
  }

  render() {
    const {topRatedMovieList} = this.state

    return (
      <div className="top-rated-bg-container">
        <h1 className="top-rated-title">Top Rated</h1>
        <ul className="top-rated-list-container">
          <Slider {...settings} className="top-rated-slider">
            {topRatedMovieList.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
}

export default TopRated
