
import { useState } from 'react';
import AnimatedImage from './AnimatedImage';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Photo } from '@/lib/data';

interface ImageGalleryProps {
  photos: Photo[];
  title?: string;
}

const ImageGallery = ({ photos, title }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-display font-light mb-8">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="cursor-pointer"
            onClick={() => setSelectedImage(photo)}
          >
            <AnimatedImage
              src={photo.url}
              alt={photo.title}
              delay={index * 100}
              className={cn(
                index % 3 === 0 ? "md:col-span-2 md:row-span-2" : "",
                "transition-all duration-300 hover:opacity-90"
              )}
              aspectRatio={photo.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}
            />
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-0">
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-lg font-medium">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-sm text-white/70">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
