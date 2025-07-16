document.addEventListener('DOMContentLoaded', () => {
    const projectsData = [
        {
            "id": "script-surgeons",
            "title": "Script Surgeons: AI-Powered Chest X-ray Abnormality Detection",
            "shortDescription": "An advanced machine learning platform that automates the detection of 14 different musculoskeletal abnormalities in X-ray images, reducing diagnostic time and improving patient care.",
            "categories": ["AI", "Machine Learning", "Healthcare", "Computer Vision"],
            "thumbnail": "./images/projects/chestXray_abnormality_Detection/prediction-results.jpeg",
            "date": "October 2024",
            "technologies": ["YOLOv5", "Python", "Flask", "Machine Learning", "Computer Vision", "HTML/CSS/JavaScript"],
            "links": {
                "github": "https://github.com/DeepakBolleddu/ChestAbnormalityDetection",
                "report": "./docs/Capstone_Report.pdf"
            },
            "fullDescription": "Script Surgeons is an AI-powered platform designed to bridge the gap in medical image analysis, particularly for musculoskeletal injuries. Using the YOLOv5 deep learning model trained on over 15,000 X-ray images, the system can automatically detect and quantify 14 different abnormalities including Aortic Enlargement, Cardiomegaly, Pulmonary Fibrosis, and more."
        }
    ];

    window.projectsData = projectsData;
    displayProjects(projectsData);
    setupModal();
});

function displayProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}">
            <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-categories">
                ${project.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
            </div>
            <p class="project-description">${project.shortDescription}</p>
            <span class="project-date">${project.date}</span>
        </div>
    `).join('');
}

function setupModal() {
    const modal = document.getElementById('project-modal');
    const grid = document.getElementById('projects-grid');
    
    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.project-card');
        if (card) {
            const projectId = card.getAttribute('data-id');
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                document.getElementById('modal-content-container').innerHTML = `
                    <h2 class="modal-title">${project.title}</h2>
                    <div class="modal-description">${project.fullDescription}</div>
                    <h3>Technologies Used</h3>
                    <div class="modal-technologies" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
                        ${project.technologies.map(tech => `<span class="technology-tag" style="background: #3498db; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">${tech}</span>`).join('')}
                    </div>
                    <div style="margin-top: 2rem;">
                        <a href="${project.links.github}" target="_blank" class="modal-link" style="background: #3498db; color: white; padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none; margin-right: 1rem; display: inline-block;">
                            <i class="fab fa-github"></i> GitHub Repository
                        </a>
                        <a href="${project.links.report}" target="_blank" class="modal-link" style="background: #e74c3c; color: white; padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none; display: inline-block;">
                            <i class="fas fa-file-pdf"></i> View Report
                        </a>
                    </div>
                `;
                modal.style.display = 'block';
            }
        }
    });

    document.querySelector('.close-button').onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };
}
