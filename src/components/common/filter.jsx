import React from "react";
const Filter = props => {
  return (
    <div className="list-group">
      {props.items.map(genre => {
        return (
          <button
            key={genre._id}
            type="button"
            className={
              props.currentGenre.name === genre.name
                ? "btn list-group-item list-group-item-action active"
                : "btn list-group-item list-group-item-action"
            }
            onClick={() => props.onFilterChange(genre)}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
