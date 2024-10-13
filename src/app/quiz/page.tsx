import { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
    title: "Quez",
    description: "A simple quiz app built with React and Next.js for FE intern @dot.indonesia",
};

export default function Home() {
    return (
        <div>
            <Quiz />
        </div>
    );
}
