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
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const menuItems = ["Profile", "Take the Test"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-black"
        />
        <NavbarBrand>
          <p className="font-bold text-black">Spiral</p>
        </NavbarBrand>
      </NavbarContent>
      {status === "authenticated" && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="border-r-2 pr-4 ">
            <Link color="foreground" href="/spiral-dynamics-test">
              Take the Test
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
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
            <Button color="primary" variant="flat" onClick={() => signOut()}>
              LogOut
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
