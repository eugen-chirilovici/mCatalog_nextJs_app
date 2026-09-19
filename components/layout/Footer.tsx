import Image from "next/image";
import ME from "@/public/images/me.png";

export default function Footer() {
    return (
        <div className="bg-gray-200 rounded-3xl mt-6">
            <div className="flex flex-row justify-around m-6">
                <Image loading="eager" src={ME} alt="My picture" width="400" height="400" className="rounded-3xl" />
                <div className="flex flex-col w-2xl text-xl text-justify gap-3 mt-4">
                    {message.map((m, index) => (
                        <p key={index}>{m}</p>
                    ))}
                </div>
            </div>
        </div>
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
] 