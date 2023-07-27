import React, { useState, useEffect } from "react";
import { getMovies } from "../../utils/utilities";
import ImageContainer from "../../atoms/Image-container";
import './style.css';



const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleSearch = (event) => {
        let searchValue = event.target.value.trim().toLowerCase();
        if (searchValue === "") {
            setFilteredMovies(movies);
        } else {
            let filteredMovies = movies.filter(item => item.title.toLowerCase().includes(searchValue));
            setFilteredMovies(filteredMovies);
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const movies = await getMovies();
            setMovies(movies.results);
            setFilteredMovies(movies.results);
            setLoading(false);
            console.log({ movies });
        })();
    }, []);

    if (loading) {
        return <h1>Loading....</h1>
    }

    const firstMovie = filteredMovies[2];
    const imageUrl = firstMovie ? `${IMAGE_BASE_URL}/${firstMovie.poster_path}` : '';



    return (
        <div>


            <div className="nav">
                <p className="mov">M<span id="movie">oo</span>vie</p>
                <input type="search" placeholder="Search" onChange={handleSearch}></input>
                <p>Home</p>
                <p>My List</p>
                <button>Sign In</button>
            </div>


            <div className="imageHolder">
                {imageUrl && <img src={imageUrl} alt={firstMovie.title} className="upperImage"/>}
                 
            </div>

            <div className="butt">
                <button>All</button>
                <button>Action</button>
                <button>Comedy</button>
                <button>Arabic</button>
                <button>series</button>
                <button>Adventure</button>
                <button>Other</button>
            </div>


            <div className="image-container">
                {loading === false && filteredMovies.length > 0 && filteredMovies.map(
                    item => (
                        <ImageContainer props={item} key={item.id} />
                    )
                )}
            </div>
        </div>
    );
};

export default MovieList;
