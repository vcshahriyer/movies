import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../Utility/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    this.setState({ movies, genres });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted !");
      }
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentGenre: filter, searchQuery: "", currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentGenre: "", currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchQuery,
      currentGenre
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = allMovies.filter(m => m.genre._id === currentGenre._id);

    const count = filtered.length;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: count, data: movies };
  };
  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data } = this.getPageData();
    // if (totalCount === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-3">
            <Filter
              items={this.state.genres}
              currentGenre={this.state.currentGenre}
              onFilterChange={this.handleFilter}
            />
          </div>
          <div className="col-sm-9">
            <div className="row mb-3">
              <div className="col-md-3 col-sm-4">
                <Link className="btn btn-primary" to="/movies/new">
                  New Movie
                </Link>
              </div>
              <div className="col-md-9 col-sm-8">
                <p className="">Showing {totalCount} movies in the database.</p>
              </div>
              <div className="col-7">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
            </div>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
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
