import Logo from "./../Logo/Logo";
import Title from "./../Title/Title";

function Header() {
    return (
        <div className="sticky top-0 w-full bg-zinc-900 shadow-md z-50 flex justify-center items-center p-4">
            <div className="flex items-center mr-2.5">
                <Logo />
            </div>
            <div className="text-4xl font-bold text-white">
                <Title />
            </div>
        </div>
    );
}

export default Header;
