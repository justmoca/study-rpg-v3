"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {

  const pathname = usePathname();

  const menus = [

    {

      icon: "🏠",

      label: "메인",

      href: "/",

    },

    {

      icon: "📊",

      label: "상태",

      href: "/status",

    },

    {

      icon: "🎒",

      label: "인벤토리",

      href: "/inventory",

    },

    {

      icon: "🛒",

      label: "상점",

      href: "/shop",

    },

  ];

  return (

    <nav

      className="

        fixed

        bottom-0

        left-0

        right-0

        bg-white

        border-t

        shadow-lg

        flex

        justify-around

        py-3

      "

    >

      {menus.map((menu) => (

        <Link

          key={menu.href}

          href={menu.href}

          className={`

            flex

            flex-col

            items-center

            ${

              pathname === menu.href

                ? "text-blue-600"

                : "text-gray-500"

            }

          `}

        >

          <span className="text-2xl">

            {menu.icon}

          </span>

          <span className="text-xs">

            {menu.label}

          </span>

        </Link>

      ))}

    </nav>

  );

}