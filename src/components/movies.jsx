import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../Utility/paginate";
import { filterGenres } from "../Utility/genres";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = page => {
    this.setState({ currentPage: page });
  };
  handleFilter = filter => {
    this.setState({ currentGenre: filter, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  render() {
    const { pageSize, currentPage, movies: allMovies, sortColumn } = this.state;
    let movies = filterGenres(allMovies, this.state.currentGenre);
    const count = movies.length;

    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    movies = paginate(sorted, currentPage, pageSize);

    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <Filter
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
              onFilterChange={this.handleFilter}
            />
          </div>
          <div className="col">
            <p>Showing {count} movies in the database.</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
