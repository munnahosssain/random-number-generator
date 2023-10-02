function generate() {
  let number1 = document.getElementById("number1");
  let number2 = document.getElementById("number2");

  // If first time generating, teaboxes are animated to 'shrink'
  if (number1.classList.contains("noDisplay")) {
    let bigMin = document.getElementById("bigMin");
    let bigMax = document.getElementById("bigMax");
    let smallMin = document.getElementById("smallMin");
    let smallMax = document.getElementById("smallMax");
    // Make the boxes smaller
    bigMin.classList.add("small");
    bigMax.classList.add("small");

    // Animate min
    document.getElementById("sMinBox").value =
      document.getElementById("bMinBox").value;
    var minAnimate = document.getElementById("bigMin").animate(
      [
        { transform: "translate(0px, 0px)" },
        {
          transform:
            "translate(" +
            (smallMin.offsetLeft -
              bigMin.offsetLeft -
              (bigMin.clientWidth / 2 - smallMin.clientWidth / 2)) +
            "px, " +
            (smallMin.offsetTop -
              bigMin.offsetTop +
              -1 * (bigMin.clientHeight / 2 - smallMin.clientHeight / 2)) +
            "px)",
        },
      ],
      {
        duration: 200,
        iterations: 1,
        easing: "ease",
      }
    );
    minAnimate.onfinish = function () {
      smallMin.classList.remove("hidden");
      bigMin.classList.add("noDisplay");
      number1.classList.remove("noDisplay");
      // Generate random number after animation finished
      animateNumber(number1, number2);
    };

    // Animate max
    document.getElementById("sMaxBox").value =
      document.getElementById("bMaxBox").value;
    var maxAnimate = document.getElementById("bigMax").animate(
      [
        { transform: "translate(0px, 0px)" },
        {
          transform:
            "translate(" +
            (smallMax.offsetLeft -
              bigMax.offsetLeft -
              (bigMax.clientWidth / 2 - smallMax.clientWidth / 2)) +
            "px, " +
            (smallMax.offsetTop -
              bigMax.offsetTop +
              -1 * (bigMax.clientHeight / 2 - smallMax.clientHeight / 2)) +
            "px)",
        },
      ],
      {
        duration: 200,
        iterations: 1,
        easing: "ease",
      }
    );
    maxAnimate.onfinish = function () {
      smallMax.classList.remove("hidden");
      bigMax.classList.add("noDisplay");
      number1.classList.remove("noDisplay");
    };
  } else {
    animateNumber(number1, number2);
  }
}

function animateNumber(number1, number2) {
  number1.classList.remove("largeNumber");
  number2.classList.remove("largeNumber");
  let from = parseInt(document.getElementById("sMinBox").value);
  let to = parseInt(document.getElementById("sMaxBox").value);

  // Validation
  if (isNaN(from)) {
    from = 0;
  }
  if (isNaN(to)) {
    to = 0;
  }
  if (from > to) {
    let temp = from;
    from = to;
    to = temp;
  }
  document.getElementById("sMinBox").value = from;
  document.getElementById("sMaxBox").value = to;

  // Ensure a minimum distance between the two values
  let minDistance = 5; // Change this to your desired minimum distance
  let range = to - from - minDistance;

  // Start timer for random number animation
  let t = 0;
  let timer = setInterval(displayNumber, 60);

  function displayNumber() {
    // Animate/show 10 random numbers then display the chosen number in a larger font
    if (t == 10) {
      clearInterval(timer);
      number1.classList.add("largeNumber");
      number2.classList.add("largeNumber");
    } else {
      number1.classList.remove("hidden");
      number2.classList.remove("hidden");

      let random1 = Math.floor(Math.random() * (to - from + 1) + from);
      let random2 = Math.floor(Math.random() * (to - from + 1) + from);

      // Ensure the two values are different
      while (random2 === random1) {
        random2 = Math.floor(Math.random() * (to - from + 1) + from);
      }

      number1.innerHTML = random1;
      number2.innerHTML = random2;
    }
    t++;
  }
}

// function animateNumber(number1, number2) {
//   number1.classList.remove("largeNumber");
//   number2.classList.remove("largeNumber");
//   let from = parseInt(document.getElementById("sMinBox").value);
//   let to = parseInt(document.getElementById("sMaxBox").value);

//   // Validation
//   if (isNaN(from)) {
//     from = 0;
//   }
//   if (isNaN(to)) {
//     to = 0;
//   }
//   if (from > to) {
//     let temp = from;
//     from = to;
//     to = temp;
//   }
//   document.getElementById("sMinBox").value = from;
//   document.getElementById("sMaxBox").value = to;

//   // Start timer for random number animation
//   let t = 0;
//   let timer = setInterval(displayNumber, 60);

//   function displayNumber() {
//     // Animate/show 10 random numbers then display the chosen number in a larger font
//     if (t == 10) {
//         clearInterval(timer);
//         number1.classList.add("largeNumber");
//         number2.classList.add("largeNumber");
//       } else {
//         number1.classList.remove("hidden");
//         number2.classList.remove("hidden");

//         // Generate two random numbers and display them
//         let random1 = Math.floor(Math.random() * (to - from + 1) + from);
//         let random2 = Math.floor(Math.random() * (to - from + 1) + from);
//         // do {
//         //   random2 = Math.floor(Math.random() * (to - from + 1) + from);
//         // } while (random2 === random1);

//         number1.innerHTML = random1;
//         number2.innerHTML = random2;
//       }
//       t++;
//     }
// }
