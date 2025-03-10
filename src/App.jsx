import React, { useEffect ,useState } from 'react'
import Search from './components/Search';
import Spinner from './components/Spinner';
import MoviesCard from './components/MoviesCard';
import { useDebounce } from 'react-use';
import { getTrandingMovies, updateSearchCount } from './appwrite';
import Trending from './components/Trending';

const API_BASE_URL='https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS= {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  
  const [searchTerm,setSearchTerm]=useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [trendingMovies,setTrendingMovies]=useState([]);
  const [debouncedSearchTerm,setDebouncedSearchTerm]=useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

  const fetchMovies= async(query='') =>{
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint= query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                            :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const response=await fetch(endpoint,API_OPTIONS);
      
      if (!response.ok) {
        throw new Error("Faild to fetch movies");
        
      }

      const data=await response.json();
      
      if (data.Response === 'false') {
        setErrorMessage(data.Error || 'No movies found.');
        setMovies([]);
        return;
      }
      
      setMovies(data.results || [] );
      if (query && data.results.length > 0) {
        await updateSearchCount(query,data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
      
    } finally{
      setIsLoading(false);
    }
  };

  const loadTrendingMovies= async() => {
    try {
      const movies= await getTrandingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log('Error fetching tranding movies', error);
      
    }
  }

  useEffect( () => {
    fetchMovies(debouncedSearchTerm);

  }, [debouncedSearchTerm]);

  useEffect( () => {
    loadTrendingMovies()
  },[]);

  return(
   <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll
            Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length>0 && (
            <Trending trendingMovies={trendingMovies}/>
          ) }
          
          <section className="all-movies">
            <h2 >All Movies</h2>

            { isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-600">{errorMessage}</p>
            ): (
              <ul>
                {movies.map((movie) => (
                  <MoviesCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}

          </section>

        </div>
      </div>
   </main>
  )
}

export default App;
