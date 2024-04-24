// components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api';
import BookCard from './BookCard';
import ModalFavoritos from './ModalFavoritos';

const BookList: React.FC = () => {
  const [books, setBooks] = useState([]);

  const [booksFiltered, setBooksFilterd] = useState([]);

  const arregloEnJson = localStorage.getItem("booksFavorites");
    const arregloParsed = arregloEnJson ? JSON.parse(arregloEnJson) :[1];

  const [booksFavorites, setBooksFavorites] = useState(arregloParsed);

  const [modalFavoritos, setModalFavoritos] = useState(false);

  const handleViewModal= () => {
    setModalFavoritos(!modalFavoritos)
  }

  const handleFavorites = (bookSelected:any) => {
    const isExistFavorite = booksFavorites.find((book:any) => book.book.title.toLocaleLowerCase() === bookSelected.book.title.toLocaleLowerCase() )

    if(!isExistFavorite) {
      const newBooksFavorite = [...booksFavorites, bookSelected]
      setBooksFavorites(newBooksFavorite as never[])
    }else{
      const booksFavoritesFiltered = booksFavorites.filter((book:any)=> {
        console.log(book.book.title)
        return book.book.title.toLocaleLowerCase() !== bookSelected.book.title.toLocaleLowerCase()
      } )
      setBooksFavorites(booksFavoritesFiltered as never[])
    }

  }
  


  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
      setBooksFilterd(booksData)
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(search.length >0 ){
      const filterdBooks = books.filter((book:any)=> {
        console.log(book.book.title)
        return book.book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      } )
      console.log(filterdBooks)
      setBooksFilterd(filterdBooks)
    }else{
      setBooksFilterd(books)
      }
  }, [search])

  useEffect(() => {
    const arregloEnJson = JSON.stringify(booksFavorites); 
    localStorage.setItem("booksFavorites",arregloEnJson )
  }, [booksFavorites])
  

  return (
    <div className="tw-bg-gray-200 tw-p-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-200 border-b-2 border-gray-200 pb-2">
  Lista de Libros
</h1>


  
  <div className="flex items-center mb-4">
    <label htmlFor="search" className="mr-2">Buscar libro:</label>
    <input 
      id="search" 
      type="text" 
      value={search} 
      onChange={(e) => {
        console.log("Search", e.target.value);
        setSearch(e.target.value);
      }} 
      className="px-2 py-1 border border-gray-400 rounded"
    />
  </div>

  <button 
  onClick={handleViewModal} 
  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 mb-4"
>
  Lista de lectura
</button>

      <div className="grid grid-cols-4 gap-4">
        {booksFiltered.map((book: any) =>{ 
          
          const isFiltered = booksFavorites.find((bookSelected:any) => bookSelected.book.title.toLocaleLowerCase() === book.book.title.toLocaleLowerCase() )

          return <div key={book.book.title} >
            <BookCard
            book={book}
              title={book.book.title}
              cover={book.book.cover}
              genre={book.book.genre}
              pages={book.book.pages}
              year={book.book.year}
              author={book.book.author.name}
              handleFavorites={handleFavorites}
              isFavorite={isFiltered ?true :false}
            />
          </div>}
        )}
      </div>
      {
        modalFavoritos && <ModalFavoritos isOpen={modalFavoritos} setIsOpen={handleViewModal} books={booksFavorites}handleFavorites={handleFavorites}/>
      }
      
    </div>
  );
};

export default BookList;
