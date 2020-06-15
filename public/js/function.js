var utc = new Date().toJSON().slice(0, 10);

document.addEventListener("DOMContentLoaded", () => {
  const date = document.querySelector("#date");
  date.setAttribute("value", utc);

  date.onchange = () => {
    changeData();
  };

  document.querySelectorAll('.delete').forEach(link => {
    link.onclick = () => {
      alert('hello');
    }
  });
});














function changeData(){
  const date = document.querySelector("#date").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const datas = JSON.parse(this.responseText);
        let blockCode = "";
        if (datas.result.length > 0) {
          document.querySelector("#data-query").innerHTML = "";
          datas.result.forEach((data) => {
            console.log(data);
            blockCode +=
              "<tr><th scope='row'>" +
              data.name +
              "</th><td>" +
              data.amount +
              " Kg</td><td>" +
              data.price +
              " VNĐ</td><td>" +
              data.total +
              " VNĐ</td><td>" +
              data.paid +
              "<td><a href='/import/update/" +
              data._id +
              "'>Update</a></td><td><a href='#' class='delete'>Delete</a></td>";
          });
        } else {
          blockCode = "<h1>Data not found</h1>";
        }
        document.querySelector("#data-query").innerHTML = blockCode;
      }
    };
    xhttp.open("GET", "/import/getByDate/" + date, true);
    xhttp.send();
}