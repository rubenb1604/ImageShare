"use client";

import { SiNextdotjs } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiSupabaseFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const About = () => {
	const router = useRouter();

	const HomePage = () => {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	};

	//todo
	//mobile ansicht überprüfen

	//loding time verbessern

	//evtl. server komponetnt


	return (
		<>
			<div className="flex justify-center gap-4 flex-col bg-neutral-200 mt-16 m-2 rounded-md pl-4 pt-2 md:m-16">
				<span className="font-semibold text-4xl md:text-5xl">
					Zu diesem Projekt:
				</span>
				<div>
					<p className="text-xl">
						Folgende Frameworks/Librarys wurden zum erstellen genutzt:
					</p>
					<div>
						<span className="flex items-center gap-2 font-semibold text-3xl">
							<SiNextdotjs /> Next.js
						</span>
						<span className="flex items-center gap-2 font-semibold text-3xl">
							<SiReact color="#61dbfb" /> React
						</span>
						<span className="flex items-center gap-2 font-semibold text-3xl">
							<FaNodeJs color="#3c873a" /> Node.js
						</span>
						<span className="flex items-center gap-2 font-semibold text-3xl">
							<RiTailwindCssFill color="#06B6D4" /> Tailwind CSS
						</span>
					</div>
				</div>

				<div>
					<p className="text-xl">Das gesamte Projekt ist mit</p>
					<span className="flex items-center gap-2 font-semibold text-3xl">
						<SiTypescript color="#2D79C7" /> Typescript
					</span>
					<p className="text-xl">geschrieben.</p>
				</div>

				<div>
					<p className="text-xl">Daten werden in</p>
					<span className="flex items-center gap-2 font-semibold text-3xl">
						<RiSupabaseFill color="#31B279" /> Supabase
					</span>
					<p className="text-xl">gespeichert.</p>
				</div>

				<div>
					<button
						className="flex items-center text-xl font-semibold bg-neutral-300 rounded-sm p-0.5 m-1"
						onClick={HomePage}
					>
						<IoMdArrowBack /> zurück
					</button>
				</div>
			</div>
		</>
	);
};

export default About;
