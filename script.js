// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Cursor follower
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth following effect
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX - 8 + 'px';
    cursorFollower.style.top = followerY - 8 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Carousel functionality - Netflix style
let currentSlide = 0;
let totalSlides;
let autoplayInterval;

function getTotalSlides() {
    return document.querySelectorAll('.carousel-slide').length;
}

function updateCarousel() {
    totalSlides = getTotalSlides();
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlide + 1) % totalSlides;
    
    slides.forEach((slide, index) => {
        slide.classList.remove('center', 'left', 'right', 'hidden');
        
        if (index === currentSlide) {
            slide.classList.add('center');
        } else if (index === nextIndex) {
            slide.classList.add('right');
        } else if (index === prevIndex) {
            slide.classList.add('left');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function createCarouselDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    totalSlides = getTotalSlides();
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function moveCarousel(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
    resetAutoplay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoplay();
}

function autoplay() {
    moveCarousel(1);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(autoplay, 4000); // Change slide every 4 seconds
}

// Initialize carousel (create dots from actual slide count, then update positions)
createCarouselDots();
updateCarousel();

// Start autoplay
resetAutoplay();

// Pause on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});
carouselWrapper.addEventListener('mouseleave', () => {
    resetAutoplay();
});

// Project detail modal – add your extended descriptions, demo URLs, and image paths here
// Use backticks (`) for longDesc so you can write across multiple lines.
const projectDetails = {
    'ar-poster': {
        title: 'AR Poster Visualizer',
        type: 'Unity AR',
        longDesc: `
            <p>I wanted to create an app that allowed the user to visualize their posters on their wall before putting holes in their wall.</p>
            <p>This came about when I moved into my current apartment. I have a giant blank wall, and it was so daunting to figure out how I
             wanted to place my posters. I did not want to have to keep making holes just to walk back and realize I don't like it there 
             and then have to move it and make new holes. </p>
            <p>I have seen others where they trace all of their frames and posters onto butcher paper, then put that up to be able to move
             them around until they like it, but I felt like that was a waste of paper and time. Then I saw a person who used a projector to 
             map out their posters onto the wall, which I loved, but I wanted to create something that everyone could use. Not everyone has a
             projector, but almost everyone has a phone! And that started the snowball</p>
            <p>I used Unity and the AR Foundation to create an app that would allow users to scan their posters into a gallery in the app
             then allow them to place the posters on any wall. I want this to feel like those "See what this furniture would look like
             in your space."</p>
            <p>I am still currently working on the project. Currently, I have a simple gallery working that allows the user to take a picture
             and they can see it in their gallery and be able to view and delete it. My next step is to work on plane detection, which will
             then allow me to place the posters onto the plane (wall)</p> 
        `,
        codeUrl: 'https://github.com/Jazmin-P/WallPoster',
        videoUrl: 'videos/Poster.mp4',
        images: []
    },
    'smart-coaster': {
        title: 'Smart Coaster',
        type: 'Mobile App',
        longDesc: `
            <p>I am always trying to increase my water intake and also track it, and I feel like a lot of others are similar to me.</p>
            <p>I have a bad habit of forgetting to track my water intake, or maybe I just get lazy, but I also have a problem with the 
             current solution of the app out there right now. I do not like that I have to basically just guess how many ounces I have
             drank throughout the day without actually getting an accurate reading.</p>
            <p>Because of this, I decided I wanted to create something that would allow you to measure how much you have drunk and 
             automatically gets updated into an app without having to open my phone and manually guesstimate how many ounces of water
             I have drank throught the day. </p>
            <p>I have used an ESP32 and an HX711 load cell to be able to weigh a water bottle before and after drinking water. I then 
             created an app that communicates with the ESP32 to be able to record your water intake.</p>
            <p>I started this with the idea of creating a coaster, using a 3D printer, that will weigh your water bottle, but while creating
             it, I realized that I drink most of my water when I am out and about. I do not want to have to carry around a scale all the 
             time to be able to calculate, so now I am creating a boot that goes onto the bottom of your waterbottle that can be used to 
             weigh the contents. With this boot, you no longer have to carry 2 different things; it is just connected to the water bottle 
             you were already going to take with you. A perk of having it become a boot rather than a whole new water bottle a person would
             have to buy, the boot goes onto any waterbottle, and if you are out at a restaurant, you can put that glass into the boot and 
             calculate your intake, no matter what container you are using. 
            <p>Currently, I have a scale and an app that calculates and records my water intake. My next step is to create the boot aspect.
             I will be learning how to make PCBs and solder. I am planning to make the boot out of tpu filament so that there is some
             give to be able to go around different sized water bottles.</p>
        `,
        codeUrl: 'https://github.com/Jazmin-P/SmartCoaster',
        
        images: []
    },
    'alcohol-research': {
        title: 'Alcohol Consumption and Sexual Aggression',
        type: 'Unity Research',
        longDesc: `
            <p>As an undergrad, I had a campus job where we were researching the correlation between alcohol consumption and sexual
             aggression.</p>
             <p>I was in charge of creating a bar scene in Unity to be able to interact with an avatar and order drinks and food.
              I went into the job without ever knowing what Unity was, and that was exactly what they were looking for. Even before
              I knew I had the job, I downloaded and started learning how to use Unity. I would watch hundreds of YouTube videos,
              and created plenty of demo projects to learn the basics of Unity and the different mechanics I would need to use for the 
              project</p>
            <p>In the scene, the player would be a male of different intoxication levels going on a date with a lady avatar. They would
             be in a bar where the user could order drinks, food, and converse with the avatar. We had timely assessments where the user
             would have to rate their experience and anger level throughout the date. The goal was to see how the user would react 
             to rejection from a sexual advance depending on how intoxicated they were</p>
            <p>It was so amazing to see what I thought was only a game-making program and use it to make something that could help
             so many others. This is what started my love for unity and learning how I could help others in a way they had not thought 
             of before.</p>
        `,
        codeUrl: 'https://github.com/Jazmin-P/Scene1_SXSW_Demo',
        videoUrl: 'videos/BarScene.mp4',
        images: []
    }
};

const projectModal = document.getElementById('projectModal');
const modalOverlay = projectModal.querySelector('.project-modal-overlay');
const modalCloseBtn = projectModal.querySelector('.project-modal-close');
const modalTitle = projectModal.querySelector('.project-modal-title');
const modalType = projectModal.querySelector('.project-modal-type');
const modalBody = projectModal.querySelector('.project-modal-body');
const modalGallery = projectModal.querySelector('.project-modal-gallery');
const modalCodeLink = projectModal.querySelector('.project-modal-code');
const modalDemoLink = projectModal.querySelector('.project-modal-demo');

function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalType.textContent = project.type;
    modalBody.innerHTML = project.longDesc || '';
    modalCodeLink.href = project.codeUrl || '#';

    // Video Logic
    if (project.videoUrl) {
        modalDemoLink.style.display = 'inline-block';
        modalDemoLink.onclick = () => {
            modalBody.innerHTML = `
                <video controls autoplay style="width: 100%; border-radius: 1rem; margin-bottom: 1rem;">
                    <source src="${project.videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                ${project.longDesc} 
            `;
            modalDemoLink.style.display = 'none'; // Hide button once playing
        };
    } else {
        modalDemoLink.style.display = 'none';
    }

    modalGallery.innerHTML = '';
    if (project.images && project.images.length > 0) {
        project.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = project.title + ' screenshot';
            modalGallery.appendChild(img);
        });
    }

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeProjectModal);
modalCloseBtn.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
        closeProjectModal();
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // don't open modal when clicking Code/Demo links
        const id = card.getAttribute('data-project-id');
        if (id) openProjectModal(id);
    });
    card.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('a')) return;
        e.preventDefault();
        const id = card.getAttribute('data-project-id');
        if (id) openProjectModal(id);
    });
});