document.addEventListener('DOMContentLoaded', () => {
    const publicationsData = [
        {
            "id": "cvip2025-uncertainty",
            "title": "Optimized Uncertainty Quantification for Improved Chest X-ray Abnormality Detection",
            "shortDescription": "This research introduces a robust framework to enhance deep learning models for chest X-ray analysis by quantifying prediction uncertainty, improving the detection of rare abnormalities.",
            "categories": ["Publication", "Accepted", "Computer Vision", "Machine Learning"],
            "thumbnail": "https://via.placeholder.com/350x200/667eea/ffffff?text=CVIP+2025",
            "date": "Forthcoming 2025",
            "authors": ["Deepak Bolleddu", "Aswathy R"],
            "conference": "10th International Conference on Computer Vision & Image Processing (CVIP 2025)",
            "keywords": ["Uncertainty Quantification", "Deep Learning", "Chest Radiography", "Medical Imaging"],
            "links": {
                "pdf": "./docs/Research-4.pdf"
            },
            "fullDescription": "Deep learning models have shown great promise in analyzing chest X-rays, but they often struggle with rare findings and, critically, do not provide an indication of when their predictions might be incorrect. This paper addresses these limitations through a comprehensive uncertainty quantification (UQ) framework that combines Monte Carlo dropout, temperature scaling, and class-specific threshold optimization."
        }
    ];

    window.publicationsData = publicationsData;
    displayPublications(publicationsData);
    setupPublicationModal();
});

function displayPublications(publications) {
    const grid = document.getElementById('publications-grid');
    if (!grid) return;
    
    grid.innerHTML = publications.map(pub => `
        <div class="project-card" data-id="${pub.id}">
            <img src="${pub.thumbnail}" alt="${pub.title}" class="project-thumbnail">
            <h3 class="project-title">${pub.title}</h3>
            <div class="project-categories">
                ${pub.categories.map(cat => `<span class="category-tag ${cat.toLowerCase() === 'accepted' ? 'tag-accepted' : ''}">${cat}</span>`).join('')}
            </div>
            <p class="project-description">${pub.shortDescription}</p>
            <span class="project-date">${pub.date}</span>
        </div>
    `).join('');
}

function setupPublicationModal() {
    const modal = document.getElementById('publication-modal');
    const grid = document.getElementById('publications-grid');
    
    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.project-card');
        if (card) {
            const pubId = card.getAttribute('data-id');
            const publication = publicationsData.find(p => p.id === pubId);
            
            if (publication) {
                document.getElementById('publication-modal-content-container').innerHTML = `
                    <h2 class="modal-title">${publication.title}</h2>
                    <p><strong>Authors:</strong> ${publication.authors.join(', ')}</p>
                    <p><strong>Conference:</strong> ${publication.conference}</p>
                    <p><strong>Status:</strong> ${publication.date}</p>
                    <div class="modal-description">${publication.fullDescription}</div>
                    <h3>Keywords</h3>
                    <div>${publication.keywords.map(kw => `<span class="technology-tag">${kw}</span>`).join('')}</div>
                    <div style="margin-top: 2rem;">
                        <a href="${publication.links.pdf}" target="_blank" class="modal-link">View PDF</a>
                    </div>
                `;
                modal.style.display = 'block';
            }
        }
    });

    document.querySelector('.close-button').onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };
}
