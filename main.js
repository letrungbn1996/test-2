var listData = [];
var delayTimer = null;

$.getJSON("./data.json", function (data) {
  listData = data.names;
  $(".suggest-list li").remove();
  if (listData && listData.length) {
    appendData(listData);
  }
});

$("#input-text").on("input", function (e) {
  appendText("Loading...");
  clearTimeout(delayTimer);
  delayTimer = setTimeout(function () {
    let val = e.target.value;
    let filteredData = [];
    filteredData = listData.filter((name) => name.indexOf(val) > -1);
    if (filteredData && filteredData.length) {
      appendData(filteredData);
    } else {
      appendData([]);
      appendText('Không có kết quả tìm kiếm')
    }
  }, 3000);
});

function appendData(listItems) {
  $(".suggest-list li").remove();
  listItems.forEach((name) => {
    $(".suggest-list").append(`<li>
          ${name}
      </li>`);
  });
}

function appendText(text) {
  $(".suggest-list li").remove();
  $(".suggest-list").append(`<li class="disable-target">
   ${text}
    </li>`);
}
