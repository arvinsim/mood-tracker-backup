import React from "react";
import Image from "next/image";
import LoaderIcon from "./Wedges-3s-200px.svg";

export function Loader() {
  return <Image src={LoaderIcon} alt={"Loading"} width={200} height={200} />;
}
