import Link from "next/link";
import { ComponentProps } from "react";

type QueryLinkProps = Omit<ComponentProps<"a">, "href"> &
  Pick<ComponentProps<typeof Link>, "href">;

export default function QueryLink(props: QueryLinkProps) {
  const { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}
