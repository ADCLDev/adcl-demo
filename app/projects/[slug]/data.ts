

export interface ProjectData {
    id: number;
    category: string;
    title: string;
    description: string;
    demo: string;
    github: string;
    image: string;
  }

  export const data: ProjectData[] = [
    {id: 1, category:'residential', image: '/kanak.jpg', title: 'Kanok Chapa', description: "A beautiful residential Project for Client: Mrs. Kanok Chapa with land area of 4 Katha at Bashundhara", demo: 'uiux.wingaibd.com/1', github: 'https://github.com/wingaitest'},
    {id: 2, category:'residential', image: '/jakir.jpg', title: 'Jakir Residence', description: "A beautiful residential Project for Client: Mr Jakir with land area of 4 Katha at Bashundhara", demo: 'uiux.wingaibd.com/1', github: 'https://github.com/wingaitest'},
    {id: 3, category:'residential', image: '/golam.jpg', title: 'Golam Rasul Residence', description: "A beautiful residential Project for Client: Mr Golam Rasul at Jalshiri, Dhaka", demo: 'uiux.wingaibd.com/1', github: 'https://github.com/wingaitest'},
    {id: 4, category:'residential', image: '/zaman.jpg', title: 'Mr Zaman Residence', description: "A beautiful residential Project for Client: Mrs. Zaman with land area of 6.5 Katha at Demra, Dhaka", demo: 'uiux.wingaibd.com/3', github: 'https://github.com/wingaitest'},
    {id: 5, category:'Girls Hostel', image: '/hostel.jpg', title: 'Girl\'s Hostel', description: "A Girl's Hostel For Client Prime Medical College Hospital.", demo: 'uiux.wingaibd.com/2', github: 'https://github.com/wingaitest'},
    {id: 6, category:'Extensions with existing factory', image: '/abm.jpg', title: 'ABM Filling Station', description: "Extension With Existing Factory for client Madina Developments Limited over 20 katha at Kushtia", demo: 'uiux.wingaibd.com/4', github: 'https://github.com/wingaitest'},
]