import pizzavert from '@/assets/pizzavert.jpg'
import portrait from '@/assets/portrait.jpg'
import immobilier from '@/assets/immobilier.jpg'


export interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  orientation: 'landscape' | 'portrait';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  photos: Photo[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Culinaire',
    slug: 'urban',
    description: 'Modern cityscapes and urban environments',
    coverImage: pizzavert,
    photos: [
      {
        id: 'u1',
        url: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=3847',
        title: 'City Reflections',
        description: 'Modern architecture with reflective surfaces',
        orientation: 'portrait'
      },
      {
        id: 'u2',
        url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2864',
        title: 'Urban Motion',
        description: 'Long exposure capturing city movement',
        orientation: 'landscape'
      },
      {
        id: 'u3',
        url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2940',
        title: 'City Lights',
        orientation: 'landscape'
      },
      {
        id: 'u4',
        url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2940',
        title: 'Urban Density',
        orientation: 'landscape'
      },
      {
        id: 'u5',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2940',
        title: 'Downtown Perspective',
        orientation: 'landscape'
      },
      {
        id: 'u6',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2532',
        title: 'Vertical City',
        orientation: 'portrait'
      }
    ]
  },
  {
    id: '2',
    name: 'Portraits',
    slug: 'minimalist',
    description: 'Clean, simple compositions with minimal elements',
    coverImage: portrait,
    photos: [
      {
        id: 'm1',
        url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=4846',
        title: 'Minimal Tech',
        description: 'Technology in minimalist setting',
        orientation: 'landscape'
      },
      {
        id: 'm2',
        url: 'https://images.unsplash.com/photo-1503248947681-3198a7abfcc9?q=80&w=2853',
        title: 'Pure Form',
        orientation: 'landscape'
      },
      {
        id: 'm3',
        url: 'https://images.unsplash.com/photo-1463096351710-39856264e381?q=80&w=2940',
        title: 'Negative Space',
        orientation: 'landscape'
      },
      {
        id: 'm4',
        url: 'https://images.unsplash.com/photo-1486071812070-85cc4f9c7429?q=80&w=2858',
        title: 'Simple Lines',
        orientation: 'portrait'
      },
      {
        id: 'm5',
        url: 'https://images.unsplash.com/photo-1451481989342-1bed8e2047fd?q=80&w=2940',
        title: 'Minimalist Structure',
        orientation: 'landscape'
      }
    ]
  },
  {
    id: '3',
    name: 'Espaces & Immobilier',
    slug: 'abstract',
    description: 'Artistic compositions focusing on color, form, and texture',
    coverImage: immobilier,
    photos: [
      {
        id: 'a1',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=5530',
        title: 'Digital Fragments',
        description: 'Abstract interpretation of technology',
        orientation: 'landscape'
      },
      {
        id: 'a2',
        url: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2940',
        title: 'Color Study',
        orientation: 'landscape'
      },
      {
        id: 'a3',
        url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2942',
        title: 'Geometric Patterns',
        orientation: 'landscape'
      },
      {
        id: 'a4',
        url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2579',
        title: 'Textural Exploration',
        orientation: 'portrait'
      },
      {
        id: 'a5',
        url: 'https://images.unsplash.com/photo-1507908708918-778587c9e563?q=80&w=2940',
        title: 'Light Forms',
        orientation: 'landscape'
      }
    ]
  },
  {
    id: '4',
    name: 'Black & White',
    slug: 'black-and-white',
    description: 'Monochromatic photography emphasizing contrast and form',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2420',
    photos: [
      {
        id: 'bw1',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2420',
        title: 'Digital Patterns',
        description: 'Abstract black and white tech imagery',
        orientation: 'landscape'
      },
      {
        id: 'bw2',
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2938',
        title: 'Shadow Play',
        orientation: 'landscape'
      },
      {
        id: 'bw3',
        url: 'https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=2000',
        title: 'Contrast Study',
        orientation: 'portrait'
      },
      {
        id: 'bw4',
        url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2553',
        title: 'Solitude',
        orientation: 'landscape'
      },
      {
        id: 'bw5',
        url: 'https://images.unsplash.com/photo-1514473776127-61e2471630ea?q=80&w=2734',
        title: 'Urban Geometry',
        orientation: 'landscape'
      }
    ]
  },
  {
    id: '5',
    name: 'Technology',
    slug: 'technology',
    description: 'Modern technology and electronic compositions',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940',
    photos: [
      {
        id: 't1',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940',
        title: 'Digital Workspace',
        description: 'Modern laptop in minimal setting',
        orientation: 'landscape'
      },
      {
        id: 't2',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=5530',
        title: 'Circuit Detail',
        orientation: 'landscape'
      },
      {
        id: 't3',
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940',
        title: 'Tech Minimalism',
        orientation: 'landscape'
      },
      {
        id: 't4',
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2938',
        title: 'Code',
        orientation: 'landscape'
      },
      {
        id: 't5',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940',
        title: 'Team Workspace',
        orientation: 'landscape'
      }
    ]
  }
];

export const getAllCategories = () => categories;

export const getCategoryBySlug = (slug: string) => {
  return categories.find(category => category.slug === slug);
};

export const getCategoryPhotoCount = (id: string) => {
  const category = categories.find(cat => cat.id === id);
  return category ? category.photos.length : 0;
};
