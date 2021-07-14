import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class MovieCard extends Component {
  render() {
    const {movieDetails} = this.props
    const {id, title, posterPath} = movieDetails

    return (
      <Link to={`/movie/${id}`}>
        {posterPath !== null ? (
          <li className="movie-card-list-item">
            <img
              className="movie-card-poster"
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
            />
          </li>
        ) : null}
      </Link>
    )
  }
}

export default MovieCard
