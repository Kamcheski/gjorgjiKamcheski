$("#addEmployee").on("submit", function () {
  $.ajax({
    url: "php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#addName").val(),
      lastName: $("#addLastName").val(),
      jobTitle: $("#addJob").val(),
      email: $("#addEmail").val(),
      departmentID: $("#addDepartment").val(),
      location: $("#addLocation").val(),
    },
    success: function (data) {},
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
});

$.ajax({
  url: "php/getAll.php",
  type: "POST",
  dataType: "json",
  success: function (data) {
    data.forEach(function (e) {
      $("#personnel").append(
        `<div class=" col-md-4 box mb-2" data-first=${e.firstName} data-last=${e.lastName} data-id=${e.id}  data-email= ${e.email} data-department=${e.department} data-location=${e.location}> 
         <div class="list-group-item list-group-item-action flex-column align-items-start"><a><div class="d-flex w-100 justify-content-between">
         <p>Name:</p><h6 class="mb-1"> ${e.firstName} ${e.lastName} </h6></div>
         <div><div class="d-flex w-100 justify-content-between"><p>Email:</p>
         <p class="mb-1"> ${e.email} </p></div> <div class="d-flex w-100 justify-content-between">
         <p>Location:</p><p class="mb-1"> ${e.location} </p></div><div class="d-flex w-100 justify-content-between">
         <p>Department:</p><p class="mb-1"> ${e.department} </p></div></div></a><div><div class="container"><button type="button" class="col-4 btn btn-sm ml-3 mr-1" onclick="editEmployee(${e.id})" name="id"> Edit </button><button type="submit" class="col-4 btn btn-sm ml-5" name="id" value="
          ${e.id})" onclick="deleteEmployee(
          ${e.id})">Delete</button></div></div></div></div>`
      );
    });

    $("#editEmployees").on("submit", function () {
      $.ajax({
        url: "php/editEmployees.php",
        type: "POST",
        dataType: "json",
        data: {
          firstName: $("#editName").val(),
          lastName: $("#editLastName").val(),
          email: $("#editEmail").val(),
          id: $("#editId").val(),
        },
        success: function (data) {},
        error: function (jqXHR, exception) {
          errorajx(jqXHR, exception);
          console.log("error");
        },
      });
    });

    $("#deleteForm").on("submit", function () {
      $.ajax({
        url: "php/deleteEmployeesById.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $("#deleteInput").val(),
        },
        success: function (data) {},
      });
    });
  },
  error: function (jqXHR, exception) {
    errorajx(jqXHR, exception);
    console.log("error");
  },
});

function deleteEmployee(data) {
  $("#deleteInput").val(data);
  $("#delete-employee-modal").modal();
}

function editEmployee(id) {
  $.ajax({
    url: "php/editEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (data) {
      $("#editId").val(data.id);
      $("#editName").val(data.firstName);
      $("#editLastName").val(data.lastName);
      $("#editEmail").val(data.email);
      $("#edit-modal").modal();
    },
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
}

$.ajax({
  url: "php/getAllDepartments.php",
  type: "POST",
  dataType: "json",
  success: function (data) {
    data.forEach(function (e) {
      $("#selectDepartment").append(
        `<option value="${e.id}"> 
          ${e.name} </option>`
      );

      $("#dept").append(`<option value="${e.name}"> ${e.name} </option>`);
      $("#departmentModal").append(
        `<tr><td> ${e.name} </td><td><button type="submit" class="btn btn-sm"name="id" data-id="${e.id}" value="${e.id}"
         onclick="deleteDepartmentModal(${e.id})">Delete</button></td></tr>`
      );
    });

    $("#deleteDepartmentButton").on("click", function () {
      $.ajax({
        url: "php/deleteDepartmentsById.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $(this).val(),
        },
        success: function (result) {},
      });
    });
  },
  error: function (jqXHR, exception) {
    errorajx(jqXHR, exception);
    console.log("error");
  },
});

function deleteDepartmentModal(data) {
  $.ajax({
    url: "php/getPersonnelDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: data,
    },
    success: function (result) {
      $("#deleteDepartmentButton").val(data);

      $("#departmentReplace").replaceWith(
        '<div id="departmentReplace" >Are you sure you wish to delete department? </div>'
      );
      $("#deleteDepartmentButton").show();
      $("#delete-department-modal").modal();
    },
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
}

$("#addDepartmentForm").on("submit", function () {
  $.ajax({
    url: "php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      departments: $("#departmentName").val(),
      locations: $("#selectLocation").val(),
    },
    success: function (result) {},
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
});

$.ajax({
  url: "php/getAllLocations.php",
  type: "POST",
  dataType: "json",
  success: function (data) {
    data.forEach(function (e) {
      $("#selLocation").append(
        `<option value="${e.name}"> ${e.name} </option>`
      );
      $("#selectLocation").append(
        `<option value="${e.id}"> ${e.name} </option>`
      );
      $("#locationModal").append(
        `<tr><td>  ${e.name} </td><td><button type="submit" name="id" class="btn  btn-sm deleteLocat" data-id="${e.id}" value="${e.id}" onclick="deleteLocationModal(${e.id})">Delete</button></td></tr>`
      );
    });

    $("#deleteLocationButton").on("click", function () {
      $.ajax({
        url: "php/deleteLocationsById.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $(this).val(),
        },
        success: function (result) {},
        error: function (jqXHR, exception) {
          errorajx(jqXHR, exception);
          console.log("error");
        },
      });
    });
  },
});

function deleteLocationModal(data) {
  $.ajax({
    url: "php/getPersonnelLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: data,
    },
    success: function (result) {
      $("#deleteLocationButton").val(data);

      $("#deleteLocationModalReplace").replaceWith(
        "<div>Are you sure you wish to delete Location? </div>"
      );
      $("#deleteLocationButton").show();
      $("#delete-location-modal").modal();
    },
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
}

$("#locationAddForm").on("submit", function () {
  $.ajax({
    url: "php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      location: $("#addLocationInput").val(),
    },
    success: function (data) {},
    error: function (jqXHR, exception) {
      errorajx(jqXHR, exception);
      console.log("error");
    },
  });
});
