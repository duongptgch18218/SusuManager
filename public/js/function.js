var utc = new Date().toJSON().slice(0, 10);

document.addEventListener("DOMContentLoaded", () => {
  const date = document.querySelector("#date");
  date.setAttribute("value", utc);

  date.onchange = () => {
    changeData();
  };

  document.querySelectorAll(".delete").forEach((link) => {
    link.onclick = () => {
      alert('hello');
      const name = link.dataset.setname;
      var result = confirm("Do you want to delete '" + name + "' field");
      if (result == true) {
        const id = link.dataset.setid;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const datas = JSON.parse(this.responseText);
            if (datas.check) {
              alert("Remove " + name + " field successfull");
              window.location.href = "/import/";
            } else {
              alert("Remove false");
            }
          }
        };
        xhttp.open("GET", "/import/delete/" + id, true);
        xhttp.send();
      }
    };
  });
});

function changeData() {
  const date = document.querySelector("#date").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const datas = JSON.parse(this.responseText);
      let blockCode = "";
      document.querySelector('#totalKg').innerHTML = "Total kg: " + datas.totalKg + " Kg";
      document.querySelector('#totalMoney').innerHTML = "Total Money: " + datas.totalMoney + " VNĐ";
      document.querySelector('#totalPaid').innerHTML = "Total Money Paid: " + datas.totalPaid + " VNĐ";
      document.querySelector('#totalUnpaid').innerHTML = "Total Money Unpaid: " + datas.totalUnpaid + " VNĐ";
      if (datas.result.length > 0) {
        document.querySelector("#data-query").innerHTML = "";
        datas.result.forEach((data) => {
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
            "'>Update</a></td><td><a href='#' class='delete' data-setname='" +
            data.name +
            "' data-setid ='" +
            data._id +
            "'>Delete</a></td>";
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
