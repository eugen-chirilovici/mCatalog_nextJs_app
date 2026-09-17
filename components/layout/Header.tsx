import { Store } from "lucide-react";
import { Input } from "../ui/input";
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import Link from "next/link";
import BasketHome from "../basket/BasketHome";

export default function Header() {
    return (
        <div className=" bg-amber-100">
            <div className='flex flex-row justify-between my-2 mx-6'>
                <Link href="/">
                    <Store name="Market Icon" className="h-12 w-12 cursor-pointer" />
                </Link>

                <Input placeholder="Search your product"
                    className="flex h-12 w-120"
                />

                <Link href="/basket">
                    <BasketHome />
                </Link>

                <Menubar className="h-12 w-22">
                    <MenubarMenu>
                        <MenubarTrigger>My account</MenubarTrigger>
                        <MenubarContent>
                            <MenubarGroup>
                                <MenubarItem>My orders</MenubarItem>
                                <MenubarItem>Settings</MenubarItem>
                                <MenubarItem>Log out</MenubarItem>
                            </MenubarGroup>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}