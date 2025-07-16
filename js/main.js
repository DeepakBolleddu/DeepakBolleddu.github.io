/**
 * main.js - Core JavaScript for Deepak Bolleddu's personal website
 * Handles shared functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common functionality
    initNavigation();
    initScrollEffects();
    initDynamicBackground();
    initAnimations();
    initCustomCursor();
    initScrollProgress();
  });
  
  /**
   * Mobile navigation handling
   */
  function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Set active state for current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
      if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navLinks.classList.contains('active') && 
          !event.target.closest('.nav-links') && 
          !event.target.closest('.mobile-menu-toggle')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  /**
   * Scroll-triggered animations for sections
   */
  function initScrollEffects() {
    // Only initialize if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const sections = document.querySelectorAll('section');
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      sections.forEach(section => {
        observer.observe(section);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('in-view');
      });
    }
  }
  
  /**
   * Dynamic background effects based on mouse movement
   */
  function initDynamicBackground() {
    document.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    });
  }
  
  /**
   * Initialize all animation-related elements
   */
  function initAnimations() {
    // Initialize staggered animations
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    if (staggerItems.length > 0 && 'IntersectionObserver' in window) {
      const options = {
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      staggerItems.forEach(item => {
        observer.observe(item);
      });
    }
    
    // Initialize text reveal animations
    const textRevealElements = document.querySelectorAll('.animated-text');
    
    textRevealElements.forEach(element => {
      // Split text into individual spans for animation
      const text = element.textContent;
      element.textContent = '';
      
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.03}s`;
        element.appendChild(span);
      }
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('appear');
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(element);
      } else {
        element.classList.add('appear');
      }
    });
    
    // Initialize parallel scrolling elements
    initParallaxElements();
  }
  
  /**
   * Parallax scrolling effect for elements with parallax class
   */
  function initParallaxElements() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
          const scrollPosition = window.pageYOffset;
          const elementPosition = element.offsetTop;
          const distance = scrollPosition - elementPosition;
          
          // Only apply parallax if element is in viewport
          if (distance < window.innerHeight && distance > -element.offsetHeight) {
            const speed = element.getAttribute('data-speed') || 0.5;
            const translateY = distance * speed;
            
            element.querySelector('.parallax-background').style.transform = `translateY(${translateY}px)`;
          }
        });
      });
    }
  }
  
  /**
   * Initialize custom cursor effect
   */
  function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', function() {
      cursor.classList.remove('visible');
    });
    
    // Change cursor appearance when hovering over links
    const links = document.querySelectorAll('a, button, .card, .interactive-element');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.classList.add('link-hover');
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.classList.remove('link-hover');
      });
    });
  }
  
  /**
   * Create scroll progress indicator
   */
  function initScrollProgress() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });
  }
  
  /**
   * Utility function to animate numbers (for statistics, etc.)
   * @param {HTMLElement} el - The element to update with the animated number
   * @param {number} start - Starting value
   * @param {number} end - Ending value
   * @param {number} duration - Animation duration in milliseconds
   * @param {string} prefix - Optional prefix to add before the number
   * @param {string} suffix - Optional suffix to add after the number
   */
  function animateNumber(el, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  /**
   * Utility function to handle smooth scrolling to anchors
   * @param {string} targetId - The ID of the element to scroll to
   */
  function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  }
  
  /**
   * Format date strings in a consistent way
   * @param {string} dateString - The date string to format
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  