//GET ALL MESSAGES

const LIMIT = 280;
const postMessage = msg => `<ul>
      <li class="list">
        <a href="javascript:void()">
          <button type="button" id="${msg.id}" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <pre>${msg.text}</pre>
          <em class="timestamp">${moment(msg.created_at).format(
            "MMMM D, YYYY - h:mmA"
          )}</em>
        </a>
      </li>
      </ul>
    `;

$.ajax({
  method: "GET",
  url: "https://next-message-board.herokuapp.com/messages",
  success: function(messages) {
    console.log(messages);
    $("#board").html("");
    messages.forEach(msg => {
      $("#board").append(postMessage(msg));
      randomizeColors();
    });
  }
});

function randomizeColors() {
  let colors = [
    "#f2a6a6",
    "#b18ea6",
    "#e7f3ee",
    "#ffba92",
    "#d6e4aa",
    "#ffb3b3",
    "#bbded6"
  ];
  $("li").each(function() {
    let randomColors = colors[Math.floor(Math.random() * colors.length)];
    $(this).css("background-color", randomColors);
  });
}

// window.setInterval(function() {
//   var randomColor =
//     "#" +
//     ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);

//   $("li").css({
//     "background-color": randomColor
//   });
// }, 2000);

// POST MESSAGE

$("form").on("submit", function(e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "https://next-message-board.herokuapp.com/messages",
    data: {
      text: $("#text-input").val()
    },
    success: function({ message }) {
      $("#board").prepend(postMessage(message));
      $("#text-input").val("");
    },
    error: function(error) {
      console.log(`Error: ${error}`);
    }
  });
});
