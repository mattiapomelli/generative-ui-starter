import { AI } from "../action";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AI>{children}</AI>;
}
