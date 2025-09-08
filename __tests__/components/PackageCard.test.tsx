import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PackageCard } from '@/components/packages/PackageCard';
import { Package } from '@/lib/types/packages';

// Mock package data
const mockPackage: Package = {
  sku: 'test-package',
  name: 'Test Package',
  shortDescription: 'A test package for testing purposes',
  longDescription: 'This is a longer description for the test package',
  priceInr: 2999,
  originalPriceInr: 3999,
  thumbnailUrl: '/test-image.jpg',
  includedCourses: [
    {
      id: 'course-1',
      title: 'Test Course 1',
      duration: '2 weeks',
      link: '/courses/test-course-1'
    }
  ],
  livePassCount: 2,
  mentorHours: 3,
  certificateIncluded: true,
  prerequisites: [],
  faq: [],
  testimonials: []
};

describe('PackageCard', () => {
  const mockOnViewDetails = jest.fn();
  const mockOnBuy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders package information correctly', () => {
    render(
      <PackageCard
        package={mockPackage}
        onViewDetails={mockOnViewDetails}
        onBuy={mockOnBuy}
      />
    );

    expect(screen.getByText('Test Package')).toBeInTheDocument();
    expect(screen.getByText('A test package for testing purposes')).toBeInTheDocument();
    expect(screen.getByText('₹2,999')).toBeInTheDocument();
    expect(screen.getByText('₹3,999')).toBeInTheDocument();
    expect(screen.getByText('You save ₹1,000')).toBeInTheDocument();
  });

  it('calls onViewDetails when View details button is clicked', () => {
    render(
      <PackageCard
        package={mockPackage}
        onViewDetails={mockOnViewDetails}
        onBuy={mockOnBuy}
      />
    );

    const viewDetailsButton = screen.getByText('View details');
    fireEvent.click(viewDetailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith('test-package');
  });

  it('calls onBuy when Buy button is clicked', () => {
    render(
      <PackageCard
        package={mockPackage}
        onViewDetails={mockOnViewDetails}
        onBuy={mockOnBuy}
      />
    );

    const buyButton = screen.getByText('Buy');
    fireEvent.click(buyButton);

    expect(mockOnBuy).toHaveBeenCalledWith('test-package');
  });

  it('displays package features correctly', () => {
    render(
      <PackageCard
        package={mockPackage}
        onViewDetails={mockOnViewDetails}
        onBuy={mockOnBuy}
      />
    );

    expect(screen.getByText('2 Live Sessions')).toBeInTheDocument();
    expect(screen.getByText('3h Mentoring')).toBeInTheDocument();
    expect(screen.getByText('Certificate')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <PackageCard
        package={mockPackage}
        onViewDetails={mockOnViewDetails}
        onBuy={mockOnBuy}
      />
    );

    const viewDetailsButton = screen.getByLabelText('View details for Test Package');
    const buyButton = screen.getByLabelText('Buy Test Package for ₹2,999');

    expect(viewDetailsButton).toBeInTheDocument();
    expect(buyButton).toBeInTheDocument();
  });
});
