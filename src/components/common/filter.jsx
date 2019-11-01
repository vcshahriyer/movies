import React from "react";
const Filter = props => {
  return (
    <div className="list-group">
      <button
        key="1"
        type="button"
        className={
          props.currentGenre === ""
            ? "list-group-item list-group-item-action active"
            : "list-group-item list-group-item-action"
        }
        onClick={() => props.onFilterChange("")}
      >
        All Genres
      </button>
      {props.genres.map(genre => {
        return (
          <button
            key={genre._id}
            type="button"
            className={
              props.currentGenre === genre.name
                ? "btn list-group-item list-group-item-action active"
                : "btn list-group-item list-group-item-action"
            }
            onClick={() => props.onFilterChange(genre.name)}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
