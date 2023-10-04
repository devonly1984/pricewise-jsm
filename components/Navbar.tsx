import { NavIcons } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full ">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            height={27}
            width={27}
          />
          <p className="nav-logo">
            Price<span className="text-primary">Wise</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {NavIcons.map((icon) => (
            <Image
              src={icon.src}
              alt={icon.alt}
              key={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
