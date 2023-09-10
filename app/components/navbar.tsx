import { Button } from "@mui/material";
import { deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const logoff = () => {
        deleteCookie('token');
        router.push('/login')
    };
  return (
    <nav
      className="bg-zinc-100 text-zinc-600 flex items-center w-full fixed z-10 px-4 shadow-sm h-16"
    >
      <div className="font-bold text-2xl">Book Exchange</div>
      <div className="flex-grow"></div>
      <Button className={"text-zinc-600"} onClick={logoff}>
        Sair
      </Button>
    </nav>
  );
};
export default Navbar;

