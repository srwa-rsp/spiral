import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSession, signOut} from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from '@/assets/images/enso-spiral.png'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const menuItems = [
    { title: "Profile", link: "/user/profile" },
    { title: "Take the Test", link: "/spiral-dynamics-test" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-black"
        />
        <NavbarBrand>
          <Image width={30} height={30} src={logo} alt={"logo"} />
          <Link color="foreground" href="/" className="text-[1.6rem] font-bold">
            Spiral
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {status === "authenticated" && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className={`border-r-2 pr-4`} >
            <Link color="foreground" href="/spiral-dynamics-test" className={`${router.pathname ==="/spiral-dynamics-test" ? 'font-semibold border-b-2': '' } p-1`}>
              Take the Test
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link color="foreground" href="/user/profile" className={`${router.pathname ==="/user/profile" ? 'font-semibold border-b-2': '' } p-1`}>
              Profile
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {status === "unauthenticated" && router.pathname != "/auth/login" && (
          <NavbarItem className="">
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
        )}
        {status === "authenticated" && (
          <NavbarItem>
            <Button color="primary" variant="flat" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/auth/login' })}>
              LogOut
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.link} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
