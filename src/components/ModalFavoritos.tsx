
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'
import BookCard from './BookCard'

interface Props {
    isOpen:boolean,
    setIsOpen:()=> void,
    books:any,
    handleFavorites?: (bookSelected: any) => void; 
}

export const ModalFavoritos = ({
    isOpen,
    setIsOpen,
    books,
    handleFavorites
}:Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >Lista de libros que estas leyendo
                  </Dialog.Title>
                  <div className="mt-2">
                  <div className="grid grid-cols-4 gap-4">
                  {books.map((book: any) =>{ 
          
          const isFiltered = books.find((bookSelected:any) => bookSelected.book.title.toLocaleLowerCase() === book.book.title.toLocaleLowerCase() )

          return <div key={book.book.title} className="tw-w-1/4 tw-p-4">
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
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={setIsOpen}
                    >
                      Salir
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default ModalFavoritos



