/*
  Thanks to Medaillek for theme provider fix!
  Fix: https://github.com/shadcn-ui/ui/issues/5552#issuecomment-2435053678
*/
"use client"

import dynamic from "next/dynamic"

const NextThemesProvider = dynamic(
	() => import("next-themes").then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

export default function ThemeProvider({
  children,
  ...props
}: {
  [key: string]: any;
}) {
	return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}