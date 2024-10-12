"use client";

import { useState } from "react"; // Importiere useState
import { twMerge } from "tailwind-merge";
import { FaGithub } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { TiThMenu } from "react-icons/ti";

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

	//header evtl. neu machen

	//-> einzelne components




	//todo menu testen mobile view






	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const AboutPage = () => {
		if (typeof window !== "undefined") {
			router.push("/about");
		}
	};

	const HomePage = () => {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	};
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	//


	return (
		<div
			className={twMerge(
				`
      bg-neutral-200
    `,
				className
			)}
		>
			<div className="flex flex-col">
				<div className="w-full flex justify-between p-0.5">
					{!isMenuOpen && (
						<a
							className="text-4xl font-sans font-bold cursor-pointer"
							onClick={HomePage}
						>
							<span className="text-red-700">Image</span>
							<span className="">Share</span>
						</a>
					)}
					{isMenuOpen && (
						<div className="flex items-center text-3xl font-sans font-medium gap-4 pl-2">
							<a
								className="flex items-center gap-2 bg-neutral-400 rounded-md pr-2 pl-2 pt-1 pb-1"
								href="https://github.com"
							>
								<FaGithub className="" /> Github
							</a>
							<button
								className="flex items-center gap-2 bg-neutral-400 rounded-md pr-2 pl-2 pt-1 pb-1"
								onClick={AboutPage}
							>
								<FaProjectDiagram /> About
							</button>
						</div>
					)}

					<div>
						<div className="flex items-center text-3xl font-sans font-medium gap-4 pr-2">
							<a
								className="gap-2 items-center bg-neutral-400 rounded-md pr-2 pl-2 pt-1 pb-1 hidden md:flex"
								href="https://github.com"
							>
								<FaGithub className="" />
								Github
							</a>
							<button
								className="gap-2 items-center bg-neutral-400 rounded-md pr-2 pl-2 pt-1 pb-1 hidden md:flex"
								onClick={AboutPage}
							>
								<FaProjectDiagram />
								About this project
							</button>
						</div>
						<button className="h-full p-0.5" onClick={toggleMenu}>
							<TiThMenu className="md:hidden size-8" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
