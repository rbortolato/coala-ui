'use client'
import { useState, useEffect, useRef } from "react"
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { RxUpdate } from "react-icons/rx"
import { FaExchangeAlt } from "react-icons/fa"
import services from "@/services";
import { BookDto } from "@/app/services/dto/book/bookDto"
import SelectBook from "@/app/components/selectBook";

export default function Search() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [ openSelectBook, setOpenSelectBook ] = useState(false);
  const [ books, setBooks ] = useState<BookDto[]>([]);
  const [ bookSelected, setBookSelected ] = useState({} as BookDto);
  const headList = ['Nome', 'Autor', 'Editora', 'Edição', 'Usuário', 'Ações'];

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    if (searchInput.current) searchInput.current.value = ''
    services.book.listBooks().then(resp => {
      setBooks(resp);
    });
  };

  const handleSearch = (search: string) => {
    services.book.listBooks(search).then(resp => {
      setBooks(resp);
    });
  }

  const handleChange = (book: BookDto) => {
    setBookSelected(book);
    setOpenSelectBook(true);
  };

  const getHighlightedText = (text: string) => {
    const highlight = searchInput.current ? searchInput.current.value : ''
    const parts: string[] = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{ parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span className="bg-blue-300">{part}</span> : part) }</span>;
}

  const thClasses =
    "border-solid border border-zinc-600 bg-indigo-100 text-zinc-600 py-2 text-center";
  const tdClasses =
    "border-solid border border-zinc-600 whitespace-nowrap pl-2";

  return (
    <div>
      <SelectBook open={openSelectBook} setOpen={setOpenSelectBook} bookSelected={bookSelected} />
      <div className="flex mb-2">
        <TextField
          fullWidth
          label="Buscar"
          placeholder="Nome/Autor/Editora/Usuário"
          size="small"
          inputRef={searchInput}
          onChange={e => handleSearch(e.target.value)}
          className="mr-2"
        />
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
                    {getHighlightedText(book.title)}
                  </td>
                  <td className={tdClasses}>
                    {getHighlightedText(book.author || '')}
                  </td>
                  <td className={tdClasses}>
                    {getHighlightedText(book.publisher || '')}
                  </td>
                  <td className={`${tdClasses} !text-end pr-2`}>
                    {book.edition || ""}
                  </td>
                  <td className={tdClasses}>
                    {getHighlightedText(book.user?.name || "")}
                  </td>
                  <td className={`${tdClasses} !text-center`}>
                    <Tooltip title="Solicitar Troca">
                      <IconButton
                        aria-label="change"
                        onClick={() => handleChange(book)}
                      >
                        <FaExchangeAlt size={14} />
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
