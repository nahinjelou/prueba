// components/BookCard.tsx
import React from 'react';

interface BookCardProps {
  book: any;
  title: string;
  cover: string;
  genre: string;
  pages: number;
  year: number;
  author: string; 
  handleFavorites?: (bookSelected: any) => void; 
  isFavorite: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ title, cover, genre, pages, year, author, handleFavorites, book, isFavorite }) => {

  return (
    <div className="tw-w-1/4 tw-p-4">
      <div className="tw-rounded-lg tw-overflow-hidden tw-shadow-lg">
        <img src={cover} alt={title} className="tw-w-full tw-h-64 tw-object-cover" />
        <div className="tw-bg-white tw-p-4">
          <h2 className="tw-mt-2 tw-text-lg tw-font-bold">{title}</h2>
          <p className="tw-text-gray-800">{`Género: ${genre}`}</p>
          <p className="tw-text-gray-800">{`Páginas: ${pages}`}</p>
          <p className="tw-text-gray-800">{`Año: ${year}`}</p>
          <p className="tw-text-gray-800">{`Autor: ${author}`}</p>
          <button onClick={()=>{handleFavorites && handleFavorites(book)}}>
          {
            isFavorite ?"Eliminar de Lista" :"Agregar a lista"
          }
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
