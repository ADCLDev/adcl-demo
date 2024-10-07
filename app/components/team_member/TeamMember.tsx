import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import { TeamCard } from './TeamCard'; // Assuming TeamCard is in the same directory

interface TeamMember {
  image: string;
  name: string;
  role: string;
  qualification: string;
  linkedin: string;
}

interface TeamMemberProps {
  member: TeamMember;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ member }) => (
  <TeamCard>
    <div className="relative group aspect-w-3 aspect-h-4 overflow-hidden">
      <Image
        src={member.image}
        alt={member.name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 transform group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
        <p className="text-lg mb-1">{member.role}</p>
        <p className="text-sm mb-3">{member.qualification}</p>
        <div className="flex space-x-4">
          <motion.a
            href={`https://linkedin.com/in/${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-blue-400 hover:text-blue-300"
          >
            <UserCircle size={24} />
          </motion.a>
          {/* Add more social icons as needed */}
        </div>
      </div>
    </div>
  </TeamCard>
);