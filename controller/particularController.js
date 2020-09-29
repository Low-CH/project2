var url = "http://localhost:5000/api/v1/particulars";
mainApp.controller(
  "particularController",
  ["$scope", "$http", function ($scope, $http) {
    $scope.form = {};
    $scope.records = {
      isDisabled: false,
      genders: [{
        name: "Male",
        value: "Male",
      }, {
        name: "Female",
        value: "Female",
      }],
      particulars: [],
      selected: {
        firstName: "",
        lastName: "",
        job: "",
        gender: "",
      },
      state: "",
      add: function () {
        $scope.isDisabled = false;
        $scope.records.selected = {
          firstName: "",
          lastName: "",
          job: "",
          gender: "Male",
        };
        $scope.records.state = "add";
        $scope.form.particulars.$setPristine();
      },
      info: function (index) {
        $scope.isDisabled = true;
        $scope.records.selected = $scope.records.particulars[index];
        $scope.records.state = "info";
      },
      edit: function (index) {
        $scope.isDisabled = false;
        $scope.records.selected = $scope.records.particulars[index];
        $scope.records.state = "edit";
      },
      delete: function (id) {
        $http.delete(`${url}/${id}`).then(function (response) {
          $scope.records.particulars = response.data.data;
          swal({
            title: "Delete Particular",
            text: "You have deleted a particular successfully!",
            icon: "success",
          });
        }).catch((error) => {
          swal({
            title: "Delete Particular",
            text: "Unable to delete a particular!",
            icon: "error",
          });
        });
      },
    };

    $http.get(url).then(function (response) {
      $scope.records.particulars = response.data.data;
    });

    $scope.submit = function () {
      if ($scope.records.state == "add") {
        $http.post(url, $scope.records.selected).then(
          function (response) {
            $scope.records.particulars = response.data.data;
            swal({
              title: "Add Particular",
              text: "You have added a particular successfully!",
              icon: "success",
            });
          },
        ).catch((error) => {
          swal({
            title: "Add Particular",
            text: "Unable to add a particular!",
            icon: "error",
          });
        });
      }
      if ($scope.records.state == "edit") {
        let { firstName, lastName, job, gender, id } = $scope.records.selected;
        $http.put(
          `${url}/${id}`,
          { firstName, lastName, job, gender },
        )
          .then(
            function (response) {
              $scope.records.particulars = response.data.data;
              swal({
                title: "Edit Particular",
                text: "You have edited a particular successfully!",
                icon: "success",
              });
            },
          ).catch((error) => {
            swal({
              title: "Edit Particular",
              text: error.data.msg,
              icon: "error",
            });
          });
      }
      $("#exampleModal").modal("hide");
    };
  }],
);
