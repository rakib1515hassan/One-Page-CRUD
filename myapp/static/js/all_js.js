

$("#btnsave").click(function (e) {
    e.preventDefault()
     console.log("Save Button Is Clicked1");

    output = ""
    let sid = $('#stuid').val();
    let name = $("#name").val()
    let email = $("#email").val()
    let major = $("#major").val()


    if (name == ""){
        console.log("Enter Name!");
    } else if (email == ""){
        console.log("Enter Email!");
    } else if (major == "") {
        console.log("Enter Major!");
    } else {
        mydata = {stuid:sid, name:name, email:email, major:major}

        $.ajax({
            url: "save_student/",
            type: "POST",
            data: mydata,
            success: function(data){
                console.log("Status:", data.status);
                x = data.student_data
                console.log("Student Info: ",x)
                if(data.status == "Saved"){
                    console.log("Sending Data...");
                    let output="";
                    for(i=0; i<x.length; i++){
                        output += "<tr><td>" + (i+1) +
                            "</td><td>" + x[i].name +
                            "</td><td>" + x[i].email +
                            "</td><td>" + x[i].major +
                            "</td><td> <input type='button' value='Edit' class='btn btn-primary btn-edit btn-sm px-3' data-sid= "+ x[i].id + "> <input type='button' onclick='deletetest("+ x[i].id +")' value='X' class='btn btn-danger btn-sm btn-del px-3' data-sid= "+ x[i].id + "/>"

                    }
                    $("#tbody").html(output)
                    $("#form")[0].reset()
                }

            }
        })
    }
})



//-----------------------------------------------Delete  Information----------------------------------------------------

function deletetest(id){
//    alert(id)
    $.ajax({
        url: "delete_student/",
        method: "POST",
        data: {
            prod_id: id
        },

    success: function(data){
            console.log("Status:", data.status);

            x = data.student_data
            console.log("Student Info: ",x)

            if(data.status == 1){
                console.log("Sending Data...");
                let output = "";
                for(i=0; i<x.length; i++){
                    output += "<tr><td>" + (i+1) +
                        "</td><td>" + x[i].name +
                        "</td><td>" + x[i].email +
                        "</td><td>" + x[i].major +
                        "</td><td> <input type='button' value='Edit' class='btn btn-primary btn-edit btn-sm px-3' data-sid= "+ x[i].id + "> <input type='button' onclick='deletetest("+ x[i].id +")' value='X' class='btn btn-danger btn-sm btn-del px-3' data-sid= "+ x[i].id + "/>"
                }
                $("#tbody").html(output)
                $("#form")[0].reset()
            }

        }

    })
}



//----------------------------------------------Edit Informations-------------------------------------------------------

$('#tbody').on("click", ".btn-edit", function(){
    console.log("Edit Button Cliked");
    let id = $(this).attr("data-sid");

    console.log(id);

    mydata = {sid:id}

    $.ajax({
        url: "edit_student/",
        method:"POST",
        data:mydata,

        success: function(data){
            console.log(data);
            $("#stuid").val(data.id)
              $("#name").val(data.name)
              $("#email").val(data.email)
              $("#major").val(data.major)
            console.log(data.id);
        },
    })
})
