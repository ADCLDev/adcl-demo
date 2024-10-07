"use client"


import React from 'react'
import { Navigation } from '../components/nav'
import Particles from '../components/particles'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaFileDownload, FaEnvelope, FaWhatsapp, FaFacebook, FaPhone } from 'react-icons/fa'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Footer from '../components/Footer'
import partners from '../data/partners.json'
import teamMembers from '../data/team.json'
import SectionArticle from '../components/SectionArticle'
import SectionArticle2 from '../components/SectionArticle2'


  const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };
  
    return (
      <div
        onMouseMove={onMouseMove}
        className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600"
      >
        <div className="pointer-events-none">
          <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
            style={style}
          />
        </div>
        {children}
      </div>
    );
  };
  
  

  interface SectionArticleProps {
    title: string;
    content: string[];
  }

  
const page = () => {
    const pathname = usePathname();

    const pageVariants = {
      hidden: {
        opacity: 0,
        y: 50, // Start from 50px below
      },
      visible: {
        opacity: 1,
        y: 0, // Move to its final position
        transition: {
          duration: 2, // Animation duration (2 seconds)
          ease: "easeOut", // Easing function
        },
      },
    };

  return (
    <div className="bg-gradient-to-tl from-slate-200 via-slate-100/70 to-slate-300">
			<Navigation pathName={pathname} />

      <div className="h-16 md:h-24"></div>
      
			<Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />

      <motion.div
      className="bg-gradient-to-tl from-slate-400 via-zinc-100/20 to-slate-200"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      >
        <div className="px-4 py-8 mx-auto max-w-7xl">  
        {/* Title Section */}
          <section className="text-center my-12">
            <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">About Us</h1>
          </section>

          {/* Prelude, Vision, Design Method */}
          <section className="grid gap-12 md:grid-cols-3">
            <SectionArticle
              title="Introduction"
              content="Arch Design & Construction Limited (ADCL) was established in Dhaka in 2010 to offer Architectural and Interior Design services to clients for a wide range of construction projects.

ARCH DESIGN & CONSTRUCTION LIMITED opened an office in Dhaka in 2010 to meet the growing need in Bangladesh for buildings designed to International Standards. Ar. Mohammad Khaled Abdullah Chairman, B.Arch MIAB.A-217 (RAZUK, CDA & CAN’T BOARD) & Architect Sheikh Abidul Islam Managing Director were both founder member of Arch design & Construction Limited. 

ADCL has a well-established office with good understanding and knowledge of building construction technology in Bangladesh & Worldwide. Together with the Skilled Manpower, ADCL provides a comprehensive range of design and management services to the construction industry at home and abroad.

ADCL has since expanded its consultancy services to the disciplines of Architecture, Civil and Structural Engineering as well as Project & Construction management and recently to Building Services Engineering. 

The practice now offers design services in the fields of Architecture, Interior Design, Landscapes, Civil and Structural Engineering and Building Services Engineering, advising clients in the areas of commercial, medical, residential, industrial, recreational, educational and corporate office buildings. "
            />
            <SectionArticle
              title="Vision"
              content="“ADCL” ELEVATES THE EVERYDAY EXPERIENCE

We’re a Local design firm located in Dhaka, Founded in 2010 and our history runs deep. Since our founding, we’ve partnered with national and international brands to design and produce projects across Bangladesh. Our design process is collaborative, and same-day responsiveness is in our DNA.

We provide full-scope architectural design services, including virtual reality, interior design, code services and more. We love what we do, and what it takes to get there. From the initial design phases, to the day you take possession, our full-scope services not only get the job done, but get it done right.

We believe it shouldn’t be complicated to work with an architecture and design firm. We treat our clients like partners, and their projects like our own business. While some projects present unique challenges, we’ve found they can always be overcome through our simplified process: to listen, respond, create and accelerate.

The long-term relationships we’ve developed with our clients are critical to ADCL’s success.
"
            />
            <SectionArticle2
              title="Our Services"
              content={[
                "ARCHITECTURAL DESIGN & ILLUSTRATION",
                "INTERIOR DESIGN & DECOR",
                "CONSTRUCTION DOCUMENT PRODUCTION",
                "PERMITTING FROM GOVT AGENCIES",
                "CONSTRUCTION ADMINISTRATION",
                "VIRTUAL REALITY (ANIMATION)"
              ]}
            />

          </section>

          <section className="my-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="text-center my-12">
          <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">Our Partners</h1>
        </section>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map(partner => (
            
            <motion.div
    key={partner.id}
    className="relative overflow-hidden rounded-xl shadow-lg group w-full sm:w-72 md:w-60 lg:w-72 xl:w-80 h-[350px]"
    whileHover={{
      scale: 1.05,
      rotateX: 10,
      rotateY: -10,
      transition: { duration: 0.2 },
    }}
  >
    <div className="absolute inset-0 bg-gray-200">
      <img
        src={partner.image}
        alt={partner.name}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-lg font-bold">{partner.name}</h3>
      <p className="mt-1 text-sm">{partner.designation}</p>
      <p className="mt-1 text-sm">{partner.role}</p>
      <p className="mt-1 text-xs">{partner.qualification}</p>
      <div className="flex justify-center gap-4 mt-4">
        {partner.social.facebook && (
          <Link href={partner.social.facebook} passHref target="_blank" rel="noopener noreferrer">
            <span className="text-blue-600 hover:text-blue-800 transition-colors">
              <FaFacebook className="text-2xl" />
            </span>
          </Link>
        )}
        {partner.social.mobile && (
          <Link href={`tel:+${partner.social.mobile}`} passHref target="_blank" rel="noopener noreferrer">
            <span className="text-blue-400 hover:text-blue-600 transition-colors">
              <FaPhone className="text-2xl" />
            </span>
          </Link>
        )}
        {partner.social.email && (
          <Link href={`mailto:${partner.social.email}`} passHref>
            <span className="text-red-500 hover:text-red-700 transition-colors">
              <FaEnvelope className="text-2xl" />
            </span>
          </Link>
        )}
        {partner.social.whatsapp && (
          <Link href={`https://wa.me/${partner.social.whatsapp}`} passHref target="_blank" rel="noopener noreferrer">
            <span className="text-green-500 hover:text-green-700 transition-colors">
              <FaWhatsapp className="text-2xl" />
            </span>
          </Link>
        )}
      </div>
    </div>
            </motion.div>

          ))}
        </div>
          </section>

          {/* Teams Section */}
          <section className="my-12">
            <section className="text-center my-12">
              <h1 className="text-4xl font-bold bg-black border-4 border-black rounded-lg text-white p-4 inline-block">Our Team</h1>
            </section>
            <div className="grid gap-6 md:grid-cols-3">
              {teamMembers.map(member => (
                <Card key={member.id}>
                  <div className="relative group">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={500} 
                      height={250} 
                      className="rounded-lg transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg">
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-sm mb-1">{member.role}</p>
                      <p className="text-xs mb-2">{member.qualification}</p>
                      {/* <p className="text-sm text-center mb-3">{member.description}</p> */}
                      
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          

          {/* Address and Opening Hours */}
          <section className="my-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Address</h2>
            <p className="text-zinc-900">147 Motijheel C/A, (2nd Floor), Sultan Building Dhaka-1000</p>
            <p className="text-slate-800 mt-2">Opening Hours: Sunday-Thursday 9am - 5pm</p>
          </section>
        </div>
      </motion.div>

      <Footer/>
    </div>
  )
}

export default page