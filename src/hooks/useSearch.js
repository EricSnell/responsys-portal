import React, { useState } from "react";

const useSearch = (purpose, defaultState) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-search-${purpose.toLowerCase()}`;
  const Search = () => (
    <>
      <label htmlFor={id}>Search {purpose}: </label>
      <input
        type="text"
        id={id}
        value={state}
        onChange={e => updateState(e.target.value)}
      />
    </>
  );

  return { state, updateState, Search };
};

export default useSearch;