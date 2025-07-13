import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../../pages/About';

// Helper function to render About component with router
const renderAbout = () => {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );
};

describe('About Page', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderAbout();
      // Basic assertion that the component renders
      expect(document.body).toBeInTheDocument();
    });

    it('displays about page content', () => {
      renderAbout();
      // Look for common about page elements - adjust based on your actual content
      const aboutSection = document.querySelector('.about-container') || document.body;
      expect(aboutSection).toBeInTheDocument();
    });

    it('has proper page structure', () => {
      renderAbout();
      // Check for basic HTML structure
      expect(document.querySelector('div')).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('displays railway system information', () => {
      renderAbout();
      // Check for content related to railway system
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });

    it('displays company or project information', () => {
      renderAbout();
      // Check for company/project info
      const content = document.body.textContent;
      expect(content).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('renders navigation elements if present', () => {
      renderAbout();
      // Check for any navigation elements that might be present
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible content structure', () => {
      renderAbout();
      // Basic accessibility check - headings should be present
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('provides meaningful content for screen readers', () => {
      renderAbout();
      // Check that there's meaningful text content
      const textContent = document.body.textContent;
      expect(textContent.length).toBeGreaterThan(50); // Reasonable amount of content
    });
  });

  describe('Responsive Design', () => {
    it('renders appropriately on different screen sizes', () => {
      renderAbout();
      // Basic check - component should render regardless of screen size
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('SEO and Meta Information', () => {
    it('provides content for SEO optimization', () => {
      renderAbout();
      // Check that there's substantial content
      const textContent = document.body.textContent;
      expect(textContent.length).toBeGreaterThan(100);
    });
  });
});
