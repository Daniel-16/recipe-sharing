import Navbar from "@/components/Navbar";
import Recipes from "./components/Recipes";
// import Recipes from "@/components/Recipes";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="">
        <Recipes />
      </div>
    </>
  );
}
