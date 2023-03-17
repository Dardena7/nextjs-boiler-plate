import Link from "next/link";
import type { FC } from "react";

type Props = {
  isLogged: boolean;
};

export const Navigation: FC<Props> = (props) => {
  const { isLogged } = props;

  return (
    <nav className="p-16 layout-row layout-align-space-between border-bottom border-2 border-secondary-300 text-secondary-900">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
      </ul>
      <ul className="layout-row layout-align-end">
        {isLogged ? (
          <>
            <li className="mr-16">
              <Link href={"/account"}>Account</Link>
            </li>
            <li>
              <Link href={"/api/auth/logout"}>Log out</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/api/auth/login"}>Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
