import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quez",
  description: "A simple quiz app built with React and Next.js for FE intern @dot.indonesia",
};

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
