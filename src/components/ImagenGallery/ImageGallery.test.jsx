import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from './ImageGallery';

describe('ImageGallery component', () => {
  const mockGame = {
    Image: 'main-image.jpg',
    screenshots: [{ imageUrl: 'thumb.jpg' }]
  };

  test('renders main image', () => {
    render(<ImageGallery game={mockGame} />);
    expect(screen.getByAltText('Game screenshot')).toBeInTheDocument();
  });

  test('returns null when no images', () => {
    const { container } = render(<ImageGallery game={{}} />);
    expect(container.firstChild).toBeNull();
  });

  test('thumbnails exist and can be clicked', () => {
    render(<ImageGallery game={mockGame} />);
    const thumbnails = screen.getAllByAltText(/thumbnail/i);
    
    expect(thumbnails.length).toBeGreaterThan(0);
    
    fireEvent.click(thumbnails[0]);
  });
});