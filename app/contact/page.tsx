"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import Map from "../components/Map";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import Footer from "../components/Footer";

interface Social {
	href: string;
	icon: JSX.Element;
	handle: string;
	label: string;
  }
  
  interface Props {
	socials: Social[];
  }
  


const socials = [
	{
		icon: <FaWhatsapp size={20} />,
		href: "https://wa.me/8801910555777",
		label: "Whatsapp Business",
		handle: "+8801910555777",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:info@archdcl.com",
		label: "Email",
		handle: "info@archdcl.com",
	},
	{
		icon: <FaPhoneAlt size={20} />,
		href: "tel:+8801910555777",
		label: "Contact Number",
		handle: "+8801910555777",
	},
];

export default function Example() {
	const dhakaCoordinates = { lat: 23.8103, lng: 90.4125 };
	const pathname = usePathname();
	const address = `23°43'31.9"N 90°25'21.1"E`;

	return (
		<div className="bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300">
			<Navigation pathName={pathname} />

			<Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />

			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
      <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
        {socials.map((s, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card>
              <Link href={s.href} target="_blank">
                <motion.a
                  className="p-4 bg-black relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent uppercase"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange uppercase">
                    {s.icon}
                  </span>
                  <div className="z-10 flex flex-col items-center">
                    <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                      {s.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {s.label}
                    </span>
                  </div>
                </motion.a>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
			
		<motion.div
		initial={{ opacity: 1, y: -400 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 5, ease: 'easeOut' }}
		className="w-[80%] my-10 rounded-xl mx-auto bg-black"
		>
		<div className="container flex flex-col items-center justify-center px-4 mx-auto py-16 my-16 bg-gradient-to-tl from-slate-800 via-zinc-200/20 to-black shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-white">Corporate Office Location</h2>
			<Map coordinates={address} />
		</div>
		</motion.div>

		<section className="my-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Address</h2>
            <p className="text-zinc-900">147 Motijheel C/A, (2nd Floor), Sultan Building Dhaka-1000</p>
            <p className="text-slate-900 mt-2">Opening Hours: Sunday-Thursday 9am - 5pm</p>
          </section>

					
		<Footer/>
		</div>
	);
}
