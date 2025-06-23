"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterX } from 'lucide-react';
import { FilterOptions } from '@/lib/types';

interface FilterSectionProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export function FilterSection({ filters, onFilterChange, onClearFilters }: FilterSectionProps) {
  const categories = ['All', 'Singer', 'DJ', 'Dancer', 'Speaker', 'Guitarist', 'Choreographer', 'Musician'];
  const locations = [
    'All', 
    'Mumbai, Maharashtra', 
    'Delhi, NCR', 
    'Bangalore, Karnataka', 
    'Chennai, Tamil Nadu', 
    'Pune, Maharashtra', 
    'Hyderabad, Telangana', 
    'Kolkata, West Bengal',
    'Jaipur, Rajasthan',
    'Kochi, Kerala',
    'Ahmedabad, Gujarat'
  ];
  const priceRanges = [
    'All', 
    '₹15,000-30,000', 
    '₹20,000-40,000', 
    '₹25,000-50,000', 
    '₹30,000-60,000', 
    '₹35,000-75,000', 
    '₹40,000-1,00,000'
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === 'All' ? '' : value
    });
  };

  const hasActiveFilters = filters.category || filters.location || filters.priceRange;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={filters.category || 'All'}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={filters.location || 'All'}
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Select
                value={filters.priceRange || 'All'}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="shrink-0"
            >
              <FilterX className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}