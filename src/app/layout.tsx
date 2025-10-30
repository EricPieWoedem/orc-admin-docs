import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { cn } from "./utils";

const INTER_FONT = localFont({
	variable: "--font-inter",
	src: [
		{
			path: "./InterVariable.woff2",
			style: "normal",
		},
		{ path: "./InterVariable-Italic.woff2", style: "italic" },
	],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ORC Admin Web & Mobile Guide",
	description: "Documentation and guides for ORC Admin web and mobile development",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				INTER_FONT.variable,
				geistMono.variable,
				"scroll-pt-16 font-sans antialiased",
			)}
		>
			<body>
				<section className="isolate">{children}</section>
			</body>
		</html>
	);
}
