import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="container bg-primary">
      <div className="navbar">
        <Link href={"/"} data-testid={"logo"}>
          <Image
            alt={"logo"}
            src={"/logo.svg"}
            width={160}
            height={24}
            priority
          />
        </Link>
      </div>
    </div>
  );
}