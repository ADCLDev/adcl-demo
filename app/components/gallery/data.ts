export interface GalleryItem {
    id: number;
    src: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    drawings: string[];
    videoUrl: string;
    info: string;
  }
  
  export const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/kanak.jpg",
      title: "Kanok Chapa",
      description: "A beautiful residential Project for Client: Mrs. Kanok Chapa with land area of 4 Katha at Bashundhara",
      category: "Residential",
      images: [
        '/gallery-images/modern-house-1.jpg',
        '/gallery-images/modern-house-2.jpg',
      ],
      drawings: [
        '/gallery-images/modern-house-drawing-1.jpg',
        '/gallery-images/modern-house-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=0SetCoFEHNU',
      info: 'This modern minimalist house features an open floor plan, large windows for natural light, and sustainable materials throughout.',
    },
    
    {
      id: 2,
      src: "/jakir.jpg",
      title: "Jakir Residence",
      description: "A beautiful residential Project for Client: Mr Jakir with land area of 4 Katha at Bashundhara",
      category: "Residence",
      images: [
        '/gallery-images/office-building-1.jpg',
        '/gallery-images/office-building-2.jpg',
      ],
      drawings: [
        '/gallery-images/office-building-drawing-1.jpg',
        '/gallery-images/office-building-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      info: 'This state-of-the-art corporate headquarters includes collaborative workspaces, a rooftop garden, and cutting-edge energy-efficient systems.',
    },
    
    {
      id: 3,
      src: "/golam.jpg",
      title: "Mr. Golam Residence",
      description: "A beautiful residential Project for Client: Mr. Golam Rasul at Jalshiri, Dhaka",
      category: "Residence",
      images: [
        '/gallery-images/cultural-center-1.jpg',
        '/gallery-images/cultural-center-2.jpg',
      ],
      drawings: [
        '/gallery-images/cultural-center-drawing-1.jpg',
        '/gallery-images/cultural-center-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=1YOzaZuKNzc',
      info: 'This community cultural center features flexible performance spaces, art galleries, and workshops to support local artists and foster community engagement.',
    },
    
    {
      id: 4,
      src: "/zaman.jpg",
      title: "Mr. Zaman Residence",
      description: "A beautiful residential Project for Client: Mrs. Zaman with land area of 6.5 Katha at Demra, Dhaka",
      category: "Residence",
      images: [
        '/gallery-images/cultural-center-1.jpg',
        '/gallery-images/cultural-center-2.jpg',
      ],
      drawings: [
        '/gallery-images/cultural-center-drawing-1.jpg',
        '/gallery-images/cultural-center-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=1YOzaZuKNzc',
      info: 'This community cultural center features flexible performance spaces, art galleries, and workshops to support local artists and foster community engagement.',
    },
    
    {
      id: 5,
      src: "/hostel.jpg",
      title: "Girl's Hostel for Prime Medical College",
      description: "A Girl's Hostel For Client Prime Medical College Hospital.",
      category: "Girl's Hostel",
      images: [
        '/gallery-images/sustainable-home-1.jpg',
        '/gallery-images/sustainable-home-2.jpg',
      ],
      drawings: [
        '/gallery-images/sustainable-home-drawing-1.jpg',
        '/gallery-images/sustainable-home-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=7IPvVfnlkmw',
      info: 'This eco-friendly home incorporates passive solar design, rainwater harvesting, and locally sourced materials to minimize environmental impact.',
    },
    
    {
      id: 6,
      src: "/abm.jpg",
      title: "ABM Filling Station",
      description: "Elegant urban living with panoramic city views.",
      category: "Extensions with existing factory",
      images: [
        '/gallery-images/luxury-apartment-1.jpg',
        '/gallery-images/luxury-apartment-2.jpg',
      ],
      drawings: [
        '/gallery-images/luxury-apartment-drawing-1.jpg',
        '/gallery-images/luxury-apartment-drawing-2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=KYNzgqNWx2Y',
      info: 'This luxury high-rise apartment complex offers premium amenities, smart home technology, and stunning views of the city skyline.',
    },
    
  ];
  
  export const getMoreItems = (page: number, itemsPerPage: number = 5): GalleryItem[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return galleryItems.slice(startIndex, endIndex);
  };