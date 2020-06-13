var utc = new Date().toJSON().slice(0, 10);

document.addEventListener("DOMContentLoaded", () => {
  const date = document.querySelector("#date");
  date.setAttribute("value", utc);

  date.onchange = () => {
    const date = document.querySelector("#date").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const datas = this.responseText;
        // console.log(data);
        // if (data > 1) {
        //   document.querySelector("#data-query").innerHTML = "hello";
        //   console.log(data);
        // }
        // else{
        // document.querySelector("#data-query").innerHTML = "Data Not Found";
        // }
        datas.result.forEach(data => {
            console.log(data);
            document.querySelector('#data-query').innerHTML='';
            const formData = document.querySelector('#data-query');
            formData.append(document.write("<tr><th scope='row'></th>" + data.name + "<td>Kg</td><td>" + data.price + "VNĐ</td><td>" + data.total +" VNĐ</td><td>" + data.paid + " </td><td>Update</td><td>Delete</td></tr>"));
        });
      }
    };
    xhttp.open("GET", "/getByDate/" + date, true);
    xhttp.send();
  };
});
