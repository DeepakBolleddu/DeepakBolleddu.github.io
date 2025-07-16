/**
 * stories.js - Manages dynamic loading and display of stories/blog posts
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the stories listing page
    const storiesContainer = document.getElementById('stories-container');
    if (storiesContainer) {
      loadStories();
    }
    
    // Check if we're on the story details page
    const storyDetailsContainer = document.getElementById('story-details-container');
    if (storyDetailsContainer) {
      loadStoryDetails();
    }
  });
  
  /**
   * Load all stories for the stories page
   */
  function loadStories() {
    const storiesContainer = document.getElementById('stories-container');
    
    // Show loading state
    storiesContainer.innerHTML = '<div class="loading">Loading stories...</div>';
    
    // Fetch stories data
    fetch('data/stories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(stories => {
        // Clear loading message
        storiesContainer.innerHTML = '';
        
        if (stories.length === 0) {
          storiesContainer.innerHTML = '<p>No stories available at the moment. Check back soon!</p>';
          return;
        }
        
        // Generate HTML for each story
        stories.forEach((story, index) => {
          const storyCard = document.createElement('div');
          storyCard.className = 'card story-card stagger-item';
          storyCard.style.animationDelay = `${0.1 * index}s`;
          
          storyCard.innerHTML = `
            <div class="card-header image-hover-effect" style="background-image: url('${story.image}')">
              <h3 class="card-title">${story.title}</h3>
            </div>
            <div class="card-body">
              <p>${story.shortDescription}</p>
              <div class="tags">
                ${story.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
              </div>
              <p class="story-meta">
                <span class="story-date">${formatDate(story.publishDate)}</span> • 
                <span class="read-time">${story.readTime}</span>
              </p>
              <a href="story-details.html?id=${story.id}" class="view-details animated-link">Read More</a>
            </div>
          `;
          
          storiesContainer.appendChild(storyCard);
          
          // Trigger animations after a short delay
          setTimeout(() => {
            storyCard.classList.add('in-view');
          }, 100);
        });
      })
      .catch(error => {
        console.error('Error loading stories:', error);
        storiesContainer.innerHTML = '<p class="error">Unable to load stories. Please try again later.</p>';
      });
  }
  
  /**
   * Load specific story details for the story details page
   */
  function loadStoryDetails() {
    // Get story ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = parseInt(urlParams.get('id'));
    
    if (!storyId) {
      // Handle missing story ID
      document.getElementById('story-details-container').innerHTML = `
        <div class="error-container">
          <h2>Story Not Found</h2>
          <p>The story you're looking for could not be found. It may have been removed or the URL is incorrect.</p>
          <a href="stories.html" class="btn">Browse All Stories</a>
        </div>
      `;
      return;
    }
    
    // Show loading state
    document.getElementById('story-details-container').innerHTML = '<div class="loading">Loading story...</div>';
    
    // Fetch all stories
    fetch('data/stories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(stories => {
        // Find the story with matching ID
        const story = stories.find(s => s.id === storyId);
        
        if (!story) {
          // Handle story not found
          document.getElementById('story-details-container').innerHTML = `
            <div class="error-container">
              <h2>Story Not Found</h2>
              <p>The story you're looking for could not be found. It may have been removed or the URL is incorrect.</p>
              <a href="stories.html" class="btn">Browse All Stories</a>
            </div>
          `;
          return;
        }
        
        // Update page title
        document.title = `${story.title} | Deepak Bolleddu`;
        
        // Format date
        const formattedDate = formatDate(story.publishDate);
        
        // Generate story details HTML
        const detailsHTML = `
          <div class="details-header">
            <h1 class="details-title">${story.title}</h1>
            <div class="details-meta">
              <span class="story-date">${formattedDate}</span> • 
              <span class="read-time">${story.readTime}</span>
            </div>
            <div class="tags">
              ${story.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
          </div>
          
          <div class="image-hover-effect">
            <img src="${story.image}" alt="${story.title}" class="details-image">
          </div>
          
          <div class="details-content">
            <p>${story.fullDescription}</p>
          </div>
          
          <div class="story-share">
            <h3>Share this story</h3>
            <div class="social-links">
              <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="twitter-share">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="linkedin-share">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="mailto:?subject=${encodeURIComponent(story.title)}&body=${encodeURIComponent('I thought you might find this interesting: ' + window.location.href)}" class="email-share">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div class="navigation-links">
            <a href="stories.html" class="btn btn-secondary">Back to Stories</a>
          </div>
        `;
        
        // Update the container with story details
        document.getElementById('story-details-container').innerHTML = detailsHTML;
      })
      .catch(error => {
        console.error('Error loading story details:', error);
        document.getElementById('story-details-container').innerHTML = `
          <div class="error-container">
            <h2>Error Loading Story</h2>
            <p>There was a problem loading the story details. Please try again later.</p>
            <a href="stories.html" class="btn">Browse All Stories</a>
          </div>
        `;
      });
  }
  
  /**
   * Format date for display
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  