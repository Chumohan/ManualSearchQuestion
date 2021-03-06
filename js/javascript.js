$(document).ready(function main() {
  $(
    "<style>" +
      "* {" +
      "margin: 0;" +
      "padding: 0;" +
      "}" +
      "" +
      "#plug_in_main {" +
      "width: 300px;" +
      "height: 375px;" +
      "position: fixed;" +
      "padding: 30px;" +
      "top: 50px;" +
      "left: 50px;" +
      "text-align: center;" +
      "background-color: silver;" +
      "}" +
      "" +
      "#plug_in_title," +
      "#plug_in_position_up," +
      "#plug_in_position_down," +
      "#plug_in_position_left," +
      "#plug_in_position_right," +
      "#plug_in_inputer," +
      "#plug_in_select_line," +
      "#plug_in_search_button," +
      "#plug_in_keyword," +
      "#plug_in_answer," +
      "#plug_in_check {" +
      "font-weight: 300;" +
      'font-family: "Times New Roman", Times, serif;' +
      "}" +
      "" +
      "#plug_in_title {" +
      "font-size: 35px;" +
      "margin-bottom: 10px;" +
      "}" +
      "" +
      "#plug_in_position_up," +
      "#plug_in_position_down," +
      "#plug_in_position_left," +
      "#plug_in_position_right," +
      "#plug_in_search_button {" +
      "padding: 2px;" +
      "margin: 0 5px;" +
      "width: 50px;" +
      "border-radius: 3px;" +
      "border: 1px solid black;" +
      "}" +
      "" +
      "#plug_in_inputer {" +
      "width: 50%;" +
      "height: 20px;" +
      "margin-right: 5px;" +
      "}" +
      "" +
      "#plug_in_select_line {" +
      "width: 25%;" +
      "height: 23px;" +
      "margin: 0 5px;" +
      "}" +
      "" +
      "#plug_in_search_button {" +
      "width: 15%;" +
      "}" +
      "" +
      "#plug_in_keyword," +
      "#plug_in_answer," +
      "#plug_in_check {" +
      "height: 55px;" +
      "}" +
      "" +
      ".answer_title {" +
      "background-color: rgb(167, 167, 167);" +
      "margin-bottom: 15px;" +
      'font-family: Georgia, "Times New Roman", Times, serif;' +
      "}" +
      "</style>"
  ).appendTo("head");

  $(
    '<div id="plug_in_main">' +
      "" +
      '<h1 id="plug_in_title">ANSWER</h1>' +
      '<button id="plug_in_position_up">UP</button>' +
      '<button id="plug_in_position_down">DOWN</button>' +
      '<button id="plug_in_position_left">LEFT</button>' +
      '<button id="plug_in_position_right">RIGHT</button>' +
      "<br /><br />" +
      '<input id="plug_in_inputer" type="text">' +
      '<select id="plug_in_select_line">' +
      '<option value="0">?????????</option>' +
      "</select>" +
      '<button id="plug_in_search_button">??????</button>' +
      "<br/><br/>" +
      '<p class="answer_title">### ### ?????? ### ###</p>' +
      '<p id="plug_in_keyword"></p>' +
      '<p class="answer_title">### ### ?????? ### ###</p>' +
      '<p id="plug_in_answer"></p>' +
      '<p class="answer_title">### ### ?????? ### ###</p>' +
      '<p id="plug_in_check"></p>' +
      "</div>"
  )
    .appendTo("body")
    .on("click", "button", function btn_listen() {
      switch ($(this).context.id) {
        case "plug_in_position_up":
          changePosition("top", -100);
          break;

        case "plug_in_position_down":
          changePosition("top", 100);
          break;

        case "plug_in_position_left":
          changePosition("left", -100);
          break;

        case "plug_in_position_right":
          changePosition("left", 100);
          break;

        case "plug_in_search_button":
          var urls = ["https://huan.fm210.cn/api/answer?keyword="];

          var line = parseInt($("#plug_in_select_line").val());
          if (line >= urls.length) {
            alert("?????????????????????");
            break;
          }
          var question = $("#plug_in_inputer").val();
          var url = urls[line];

          switch (line) {
            case 0:
              $.get(
                url + encodeURIComponent(question),
                function show_line_1_answer(data) {
                  switch (data.code) {
                    case 1:
                      refreshAnswer(
                        data["_source"]["keyword"],
                        data["_source"]["da"],
                        data["_source"]["f"]
                      );
                      break;

                    case -1:
                      refreshAnswer(question, data["_source"]["da"], "");
                      break;

                    case -2:
                      refreshAnswer("", data["_source"]["data"], "");
                      break;
                  }
                }
              );
              break;
          }

          break;
      }
    });

  function changePosition(position, px) {
    var ele = $("#plug_in_main").css(position);
    px = px + parseInt(ele.replace(/px/, ""));
    if (px < 0) px = 0;
    if (px > 500) px = 500;
    $("#plug_in_main").css(position, px);
  }

  function refreshAnswer(q, a, c) {
    $("#plug_in_keyword").text(q);
    $("#plug_in_answer").text(a);
    $("#plug_in_check").text(c);
  }
});
