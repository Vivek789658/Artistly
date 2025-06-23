"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, MessageCircle } from 'lucide-react';
import { Artist } from '@/lib/types';

interface ArtistCardProps {
  artist: Artist;
  onQuoteRequest?: (artistId: number) => void;
}

export function ArtistCard({ artist, onQuoteRequest }: ArtistCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{artist.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{artist.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {artist.location}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {artist.category.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{artist.bio}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">{artist.priceRange}</span>
            <span className="text-xs text-gray-500">{artist.totalBookings} bookings</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onQuoteRequest?.(artist.id)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask for Quote
        </Button>
      </CardFooter>
    </Card>
  );
}