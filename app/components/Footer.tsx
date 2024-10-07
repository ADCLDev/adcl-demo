import React from 'react'
import { FaWhatsapp, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<p className="text-sm">Arch Design & Construction LTD. &copy; 2024. All rights reserved.</p>
						</div>
						<div className="flex space-x-4">
							<Link href="#" className="hover:text-[#FFD700] transition-colors duration-300">
								<FaFacebookF size={20} />
							</Link>
							<Link href="#" className="hover:text-[#FFD700] transition-colors duration-300">
								<FaTwitter size={20} />
							</Link>
							<Link href="#" className="hover:text-[#FFD700] transition-colors duration-300">
								<FaInstagram size={20} />
							</Link>
							<Link href="#" className="hover:text-[#FFD700] transition-colors duration-300">
								<FaLinkedinIn size={20} />
							</Link>
						</div>
					</div>
					<div className="mt-4 text-center">
						<p className="text-sm text-zinc-400">Designed & Developed by <Link href={`https://wingaibd.com`}><span className="text-[#FFD700] font-semibold">WING A.I.</span></Link></p>
					</div>
				</div>
			</footer>
  )
}

export default Footer