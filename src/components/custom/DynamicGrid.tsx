import { useState, type InputHTMLAttributes } from "react";

type Config = {};

type Props = {
  emptyMessage?: string;
  configs: Config[];
};

export default function DynamicGrid(props: Props) {
  const [data, setData] = useState<any[]>([]);
  return <div></div>;
}
