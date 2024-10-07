import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember as TeamMemberComponent } from './TeamMember'; // Import the actual component

interface TeamMember {
  id: string | number; // Add id property
  image: string;
  name: string;
  role: string;
  qualification: string;
  linkedin: string;
}

interface TeamMemberProps {
  member: TeamMember;
}

interface AnimatedTeamMemberListProps {
  teamMembers: TeamMember[]; // Use TeamMember directly
}

export const AnimatedTeamMemberList: React.FC<AnimatedTeamMemberListProps> = ({ teamMembers }) => {
  return (
    <section className="my-12 bg-gradient-to-b from-zinc-900 to-zinc-800 p-8 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center my-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Our Team</h1>
        <p className="mb-8 px-6 text-center text-2xl text-zinc-300">
          Meet the talented individuals who make our company great.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TeamMemberComponent member={member} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};