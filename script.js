//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
    const container = document.getElementById('image-container');
    const h3 = document.getElementById('h');
    const para = document.getElementById('para');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    let selected = [];

    function shuffleAndDisplayImages() {
      const images = [...imageClasses];
      const duplicateIndex = Math.floor(Math.random() * images.length);
      images.push(images[duplicateIndex]);
      images.sort(() => Math.random() - 0.5);
      
      images.forEach((cls, i) => {
        const img = document.createElement('img');
        img.classList.add(cls);
        img.setAttribute('data-class', cls);
        img.setAttribute('id', 'img-' + i);
        img.addEventListener('click', () => handleClick(img));
        container.appendChild(img);
      });
    }

    function handleClick(img) {
      if (selected.includes(img)) return;
      if (selected.length === 2) return;

      img.classList.add('selected');
      selected.push(img);

      resetBtn.style.display = 'inline';
      if (selected.length === 2) {
        verifyBtn.style.display = 'inline';
      }
    }

    resetBtn.addEventListener('click', () => {
      selected.forEach(img => img.classList.remove('selected'));
      selected = [];
      para.textContent = '';
      h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
      verifyBtn.style.display = 'none';
      resetBtn.style.display = 'none';
    });

    verifyBtn.addEventListener('click', () => {
      if (selected.length !== 2) return;

      const cls1 = selected[0].getAttribute('data-class');
      const cls2 = selected[1].getAttribute('data-class');

      if (cls1 === cls2) {
        para.textContent = 'You are a human. Congratulations!';
      } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }

      verifyBtn.style.display = 'none';
    });

    shuffleAndDisplayImages();