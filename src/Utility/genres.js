export function filterGenres(items, genre) {
  if (genre !== "") {
    items = items.filter(item => item.genre.name === genre);
  }
  return items;
}
