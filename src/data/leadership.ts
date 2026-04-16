import sarahMugoImg from '@/assets/team/sarah-mugo.png';
import easterWegaImg from '@/assets/team/easter-wega.png';

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  storagePath?: string;
  image?: string;
}

export const LEADERSHIP_IMAGE_BUCKET = 'leadership';

export const leaderProfiles: LeaderProfile[] = [
  {
    name: 'Sarah Mugo',
    role: 'Founder & CEO',
    bio: 'Visionary leader with deep expertise in agricultural exports and a passion for empowering Kenyan farmers.',
    storagePath: 'sarah-mugo.jpg',
    image: sarahMugoImg,
  },
  {
    name: 'Easter Wega',
    role: 'Managing Director',
    bio: 'Experienced operations leader driving excellence in quality control and international market expansion.',
    image: easterWegaImg,
  },
];
