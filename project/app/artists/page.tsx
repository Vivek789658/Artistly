"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArtistCard } from '@/components/artist-card';
import { FilterSection } from '@/components/filter-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Grid, List, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Artist, FilterOptions } from '@/lib/types';
import { toast } from 'sonner';

// Import the artists data
import artistsData from '@/data/artists.json';

function ArtistsContent() {
  const searchParams = useSearchParams();
  const [artists, setArtists] = useState<Artist[]>(artistsData);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artistsData);
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || '',
    location: '',
    priceRange: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    filterArtists();
  }, [filters, searchQuery]);

  const filterArtists = () => {
    let filtered = artists;

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(artist => 
        artist.category.some(cat => 
          cat.toLowerCase().includes(filters.category.toLowerCase())
        )
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(artist => 
        artist.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(artist => artist.priceRange === filters.priceRange);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredArtists(filtered);
  };

  const handleQuoteRequest = (artistId: number) => {
    const artist = artists.find(a => a.id === artistId);
    if (artist) {
      toast.success(`Quote request sent to ${artist.name}!`, {
        description: 'You will receive a response within 24 hours.'
      });
    }
  };

  const clearFilters = () => {
    setFilters({ category: '', location: '', priceRange: '' });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Perfect Artists
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our talented performers and find the perfect match for your event
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search artists by name, category, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <FilterSection
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredArtists.length} of {artists.length} artists
          </p>
        </div>

        {/* Artists Grid/List */}
        {filteredArtists.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {filteredArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onQuoteRequest={handleQuoteRequest}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No artists found</h3>
              <p className="mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArtistsContent />
    </Suspense>
  );
}