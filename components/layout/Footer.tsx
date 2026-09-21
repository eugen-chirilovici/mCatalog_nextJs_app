import Image from "next/image";
import ME from "@/public/images/me.png";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200/80 mt-16 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs mb-12">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                        <div className="shrink-0">
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-2">
                                <Image
                                    loading="eager"
                                    src={ME}
                                    alt="Eugeniu Chirilovici"
                                    width={300}
                                    height={300}
                                    className="rounded-xl object-cover h-full w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                            {message.map((m, index) => (
                                <p key={index} className={index === 0 ? "text-lg sm:text-xl font-bold text-slate-900" : ""}>
                                    {m}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Sport Club Store • Built by Eugeniu Chirilovici</p>
                    <div className="flex gap-6">
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Next.js</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">React</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Tailwind CSS</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Vite</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const message = [
    "Hello and welcome! 👋",
    "My name is Eugeniu Chirilovici, and I’m a Senior Java Developer with 7+ years of experience building backend applications.",
    "This is my first Next.js project, created as a practical way to bring together and apply my knowledge of React, Next.js, Tailwind CSS, and Vite in one project.",
    "While my professional background has mainly been focused on backend development with Java, I wanted to step outside my usual area and explore the modern frontend ecosystem by building something from the ground up.",
    "This project is more than just an application — it’s a hands-on learning experience and an opportunity to connect the knowledge I’ve gained with real-world development.",
    "I’m still learning, experimenting, and discovering new things along the way, and I see this project as another step in a much bigger journey. There’s always more to learn, improve, and build — and that’s what makes the process exciting. 🚀",
    "Thanks for taking the time to check it out!"
];