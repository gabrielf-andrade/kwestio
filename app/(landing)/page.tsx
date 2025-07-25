"use client";

import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen ">
      <Navbar />
      Hello World <Button>Button</Button>
    </div>
  );
}
