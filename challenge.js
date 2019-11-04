(function () {
  const timer = setInterval(setTimer, 1000);
  const counterContainer = document.getElementById('counter')
  const likeCount = {}
  let paused = false;
  listenForIncrease();
  listenForDecrease();
  likeNumber();
  listenForPause();
  listenForSubmit();

  function setTimer() {
    if ( !paused ) {
      counterContainer.innerHTML = parseInt(counterContainer.innerHTML) + 1
    }
  }

  function listenForIncrease() {
    const buttonIncrease = document.getElementById('+')
    buttonIncrease.addEventListener('click', function (event) {
      setTimer();
    })
  }

  function listenForDecrease() {
    const buttonDecrease = document.getElementById('-')
    buttonDecrease.addEventListener('click', function (event) {
      if (paused) return;
      counterContainer.innerHTML = parseInt(counterContainer.innerHTML) - 1
    });
  }

  function likeNumber() {
    const likeButton = document.getElementById('<3')
    const likesUl = document.getElementsByClassName('likes')[0]
    likeButton.addEventListener('click', function (event) {
      if (paused) return;
      const number = counterContainer.innerHTML
      const newLi = document.createElement('li')
      if (likeCount[number]) {
        likeCount[number] = likeCount[number] + 1 ;
      } else {
        likeCount[number] = 1;
      }
      newLi.innerHTML = `Number ${number} has ${likeCount[number]} likes`
      likesUl.appendChild(newLi)
    })
  }

  function listenForPause() {
    const listenForPauseButton = document.getElementById('pause')
    listenForPauseButton.addEventListener('click', function (event) {
      paused = !paused; //always sets it to its opposite. The state of my page
      if (paused) {
        listenForPauseButton.innerHTML = "resume";
      } else {
        listenForPauseButton.innerHTML = "pause";
      }
    })
  }

  function listenForSubmit() {
    const form = document.getElementById('comment-form') //remember - for forms, can only add eventListener on the form itself and not on the submit button
    const newUl = document.createElement('ul')
    const commentsContainer = document.getElementById('list')
    commentsContainer.appendChild(newUl)
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const userInput = form.querySelector('input')
      const newLi = document.createElement('li')
      newLi.textContent = userInput.value
      newUl.appendChild(newLi)
      userInput.value = "";
      userInput.focus();
    })
  }

})();

