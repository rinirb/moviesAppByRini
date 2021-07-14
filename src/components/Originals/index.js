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

class Originals extends Component {
  state = {originalsMovieList: []}

  componentDidMount() {
    this.getOriginalsMovieList()
  }

  getOriginalsMovieList = async () => {
    const url =
      'https://api.themoviedb.org/3/discover/tv?api_key=c06d8d65ccfbe1695147635adf8a5100&include_adult=false'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const originalsMovieList = data.results.map(eachMovie => {
      if (eachMovie.original_name !== undefined) {
        return {
          id: eachMovie.id,
          title: eachMovie.original_name,

          posterPath: eachMovie.poster_path,
        }
      }
      return {
        id: eachMovie.id,
        title: eachMovie.name,
        posterPath: eachMovie.poster_path,
      }
    })

    this.setState({originalsMovieList})
  }

  render() {
    const {originalsMovieList} = this.state
    return (
      <div className="originals-bg-container">
        <h1 className="originals-title">Originals</h1>
        <ul className="originals-list-container">
          <Slider {...settings} className="originals-slider">
            {originalsMovieList.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
}

export default Originals
