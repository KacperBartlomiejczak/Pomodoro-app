import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" flex justify-center items-center h-screen w-screen bg-background flex-col">
      <h1 className="font-bold text-blue-400 text-3xl">Getting started</h1>
      <Button variant="secondary">Start</Button>
    </div>
  );
}
