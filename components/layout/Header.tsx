import { Store, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import Link from "next/link";
import BasketHome from "../basket/BasketHome";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm">
                        <Store className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:inline-block">
                        Sport Club
                    </span>
                </Link>

                <div className="relative flex-1 max-w-md mx-2 sm:mx-6">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input
                        placeholder="Search your product..."
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Link href="/basket" className="flex items-center">
                        <BasketHome />
                    </Link>

                    <Menubar className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-2 h-10 transition-colors">
                        <MenubarMenu>
                            <MenubarTrigger className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 px-2 py-1 focus:bg-transparent">
                                My Account
                            </MenubarTrigger>
                            <MenubarContent align="end" className="bg-white border border-slate-200/80 shadow-lg rounded-2xl p-1.5 min-w-[160px]">
                                <MenubarGroup>
                                    <MenubarItem className="rounded-xl cursor-pointer text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2">
                                        My Orders
                                    </MenubarItem>
                                    <MenubarItem className="rounded-xl cursor-pointer text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2">
                                        Settings
                                    </MenubarItem>
                                    <MenubarItem className="rounded-xl cursor-pointer text-xs font-medium text-rose-600 hover:bg-rose-50 px-3 py-2">
                                        Log Out
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </header>
    );
}