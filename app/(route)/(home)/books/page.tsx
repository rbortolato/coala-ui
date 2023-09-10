'use client'
import { useState, useEffect } from "react"
import { BookDto } from "@/app/services/dto/book/bookDto"
import { Button, IconButton, Tooltip } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiBookAdd } from 'react-icons/bi'
import { RxUpdate } from "react-icons/rx"
import services from "@/services";
import AddEditBooks from "@/app/components/addEditBooks";

export default function Books() {
  const [ bookSelected, setBookSelected ] = useState<BookDto | null>(null);
  const [ openAddEditBooks, setOpenAddEditBooks ] = useState(false);
  const [books, setBooks] = useState<BookDto[]>([]);
  const headList = ['Nome', 'Autor', 'Editora', 'Edição', 'Ações'];

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    services.book.getBooksFromUser().then(resp => {
      setBooks(resp);
    });
  };

  const handleAdd = () => {
    setBookSelected(null);
    setOpenAddEditBooks(true);
  };

  const handleDelete = (id: number) => {
    services.book.deleteBook(id).then(() => {
      load();
    });
  };

  const thClasses =
    "border-solid border border-zinc-600 bg-indigo-100 text-zinc-600 py-2 text-center";
  const tdClasses =
    "border-solid border border-zinc-600 whitespace-nowrap pl-2";

  return (
    <div>
      <AddEditBooks open={openAddEditBooks} setOpen={setOpenAddEditBooks} bookSelected={bookSelected} loadBooks={load}/>
      <div className="flex justify-end mb-2">
        <Button
          variant="contained"
          size="small"
          className="normal-case bg-blue-900 w-28 "
          type="submit"
          onClick={handleAdd}
        >
          <BiBookAdd className="h-4 w-4" />
          <span className="pl-2">Add Livro</span>
        </Button>
        <div className="pl-2">
        <Button
            id="update"
            variant="contained"
            size="small"
            className="normal-case bg-blue-900 w-28"
            type="submit"
            onClick={load}
        >
            <RxUpdate className="h-4 w-4" />
            <span className="pl-2">Atualizar</span>
        </Button>
        </div>
      </div>
      {books.length == 0 ? <div className="border w-full rounded-lg border-indigo-900 h-10 flex items-center justify-center">Não possui dados</div>
        : <div className="w-full overflow-auto bg-white">
          <table
            className="border-collapse text-sm w-full"
          >
            <thead className="sticky top-0 text-sm">
              <tr>
                {headList.map((head) => (
                  <th className={thClasses}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  className="hover:bg-indigo-40"
                  key={book.id}
                >
                  <td className={tdClasses}>
                    {book.title}
                  </td>
                  <td className={tdClasses}>
                    {book.author}
                  </td>
                  <td className={tdClasses}>
                    {book.publisher}
                  </td>
                  <td className={`${tdClasses} !text-end pr-2`}>
                    {book.edition || ""}
                  </td>
                  <td className={`${tdClasses} !text-center`}>
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="editar"
                        onClick={() => {
                          setBookSelected(book);
                          setOpenAddEditBooks(true);
                        }}
                      >
                        <FaEdit size={14} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton
                        aria-label="remover"
                        onClick={() => handleDelete(book.id)}
                      >
                        <FaTrashAlt size={14} />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>)
}
