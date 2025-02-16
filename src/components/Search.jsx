function Search ({searchTerm,setSearchTerm}) {

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    return ( 
        <div className="search">
            <div>
                <img src="search.svg" alt="Search icon" />
                <input 
                  type="text"
                  placeholder="Search for movies... "
                  value={searchTerm}
                  onChange={handleSearch}
                />
            </div>
        </div>
     );
}
 
export default Search;