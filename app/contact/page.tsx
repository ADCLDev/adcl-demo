"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { Mail, X } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import Map from "../components/Map";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../components/Footer";

interface Social {
  icon: JSX.Element;
  label: string;
  handles: string[];
}

const socials: Social[] = [
  {
    icon: <FaWhatsapp size={20} />,
    label: "Whatsapp Business",
    handles: ["+8801910555777", "+8801711445985"],
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    handles: ["info@archdcl.com"],
  },
  {
    icon: <FaPhoneAlt size={20} />,
    label: "Contact Number",
    handles: ["+8801910555777", "+8801711445985"],
  },
];

const getHref = (label: string, handle: string): string => {
  switch (label) {
    case "Whatsapp Business":
      return `https://wa.me/${handle.replace('+', '')}`;
    case "Email":
      return `mailto:${handle}`;
    case "Contact Number":
      return `tel:${handle}`;
    default:
      return '#';
  }
};

interface HandleSelectorProps {
  social: Social;
  onClose: () => void;
}

const HandleSelector: React.FC<HandleSelectorProps> = ({ social, onClose }) => {
  return (
    <div className="p-8 relative bg-gradient-to-br from-slate-900 to-gray-800 rounded-lg shadow-2xl text-white">
      <button
        onClick={onClose}
        className="absolute hover:rounded-xl text-white top-4 right-4 hover:text-black hover:bg-white transition-colors duration-200"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <h3 className="text-2xl font-bold mb-6">{social.label}</h3>
      <div className="space-y-4">
        {social.handles.map((handle, index) => (
          <Link key={index} href={getHref(social.label, handle)} onClick={onClose}>
            <button className="w-full mb-2 text-left px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 font-medium">
              {handle}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
	const dhakaCoordinates = { lat: 23.8103, lng: 90.4125 };
	const pathname = usePathname();
	const address = `23°43'31.9"N 90°25'21.1"E`;
	const [selectedSocial, setSelectedSocial] = useState<Social | null>(null);
	const popupRef = useRef<HTMLDivElement>(null);
  
	const handleClick = (s: Social) => {
	  setSelectedSocial(s);
	};
  
	const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
	  if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
		setSelectedSocial(null);
	  }
	}, []);
  
	useEffect(() => {
	  if (selectedSocial) {
		document.addEventListener('mousedown', handleOutsideClick as unknown as EventListener);
	  } else {
		document.removeEventListener('mousedown', handleOutsideClick as unknown as EventListener);
	  }
  
	  return () => {
		document.removeEventListener('mousedown', handleOutsideClick as unknown as EventListener);
	  };
	}, [selectedSocial, handleOutsideClick]);

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
                <motion.div
                  className="p-4 bg-black relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(s)}
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {s.icon}
                  </span>
                  <div className="z-10 flex flex-col items-center">
                    {s.handles.map((handle, handleIndex) => (
                      <span key={handleIndex} className="handle lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display mb-2 cursor-pointer">
                        {handle}
                      </span>
                    ))}
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {s.label}
                    </span>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
		  {selectedSocial && (
			<motion.div 
			  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
			  initial={{ opacity: 0 }}
			  animate={{ opacity: 1 }}
			  exit={{ opacity: 0 }}
			  onClick={handleOutsideClick}
			>
			  <motion.div 
				ref={popupRef}
				className="bg-white rounded-lg shadow-2xl m-4"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ type: "spring", damping: 20, stiffness: 300 }}
				onClick={(e) => e.stopPropagation()}
			  >
				<HandleSelector social={selectedSocial} onClose={() => setSelectedSocial(null)} />
			  </motion.div>
			</motion.div>
		  )}
		</AnimatePresence>

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
        <p className="text-slate-900 mt-2">Opening Hours: Saturday-Thursday 10am - 6pm</p>
      </section>

      <Footer />
    </div>
  );
}


