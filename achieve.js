window.onload = () => {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    // Make sure the canvas is the size of the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let startTime = Date.now(); // Start time for controlling fireworks duration

    // Firework class that holds particle objects
    function Firework(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        
        // Create particles that explode out
        for (let i = 0; i < 100; i++) {
            let angle = Math.random() * 2 * Math.PI;
            let speed = Math.random() * 4 + 1;
            let size = Math.random() * 3 + 1;
            let particle = new Particle(x, y, angle, speed, size, this.color);
            this.particles.push(particle);
        }
    }

    // Particle class for individual particles of each firework
    function Particle(x, y, angle, speed, size, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.alpha = 1;

        this.update = () => {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.alpha -= 0.02; // Gradually fade the particle
        };

        this.draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        };
    }

    // Function to animate the fireworks and particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            // Remove the particle if it's faded
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate); // Keep animating
    }

    // Function to launch fireworks at random positions
    function launchFireworks() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const colors = ['255, 87, 34', '0, 188, 212', '255, 193, 7', '76, 175, 80', '156, 39, 176'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Firework(x, y, color));
    }

    // Launch fireworks for 15 seconds
    function runFireworks() {
        const currentTime = Date.now();
        if (currentTime - startTime < 15000) {
            launchFireworks();
            setTimeout(runFireworks, 200); // Launch fireworks every 200ms
        }
    }

    // Start the fireworks when the page loads
    runFireworks();
    animate();

    // Resize canvas on window resize to ensure it fills the screen
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
};
