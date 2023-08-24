export const bookmarkHandler = (pokemonId: number) => {
  const localStorageData = localStorage.getItem("bookmarksId");
  let bookmarksId: number[] = [];
  if (localStorageData) {
    bookmarksId = JSON.parse(localStorageData) as number[];
  }
  if (!bookmarksId.includes(pokemonId)) {
    bookmarksId.push(pokemonId);
  } else {
    bookmarksId = bookmarksId.filter((id) => id !== pokemonId);
  }
  localStorage.setItem("bookmarksId", JSON.stringify(bookmarksId));
};

export const isAlreadyBookmarked = (pokemonId: number): boolean => {
  const localStg = localStorage.getItem("bookmarksId");
  if (!localStg) return false;
  const Ids = JSON.parse(localStg) as number[];
  return Ids.includes(pokemonId);
};
