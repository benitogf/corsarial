(function() {

    angular.module('app.grid',[])
    .controller('GridController', GridController);

    function GridController($scope, $q) {
      console.log('grid');
      var vm = this;

      $scope.gridOptions = {
          withSelector: true, // pass true if you want to have a selector
          withSearch: true, // pass true if you want to have a search bar
          withRefresh: true, // with refresh button
          withDelete: true, // with delete button
          withRowClick: true, // pass true if you want to redirect to edit row on click
          getData: getItems,
          tableItemName: 'items',
          shownFields: {
              title: 'name', // should be same name with the actual data field from api
              description: ['productCategory', 'productFamily']
          },
          format: {
              toDate: {
                  field: ['createTime'],
              },
          },
          controllerAction: {
              rowClick: editItem,
              addBtnClick: addItem,
          },
      };

      function editItem(data) {
        console.log(data)
      }

      function addItem() {
        console.log('add');
      }

      function getItems() {
        var items = [
            {
              "id": "A01DB120438D226B48257B2C000BC2BB",
              "name": "Hexcore strings",
              "productCategory": "Accessories",
              "productFamily": "Musical Instruments",
              "productCategoryId": "001",
              "productFamilyId": "001",
              "creator": "Stephen Zhong",
              "createTime": 1459247899,
              "status": "0"
            },
            {
              "id": "1F59E627B5D56E9E48257B2C000BC2E2",
              "name": "Silk strings",
              "productCategory": "Accessories",
              "productFamily": "Musical Instruments",
              "productCategoryId": "001",
              "productFamilyId": "001",
              "creator": "Solon Long",
              "createTime": 1459247899,
              "status": "0"
            },
            {
              "id": "A58049C0A6A4C0FB48257B2C000BC34E",
              "name": "Nickel-plated strings",
              "productCategory": "Accessories",
              "productFamily": "Musical Instruments",
              "productCategoryId": "001",
              "productFamilyId": "001",
              "creator": "Anson Cai",
              "createTime": 1459247899,
              "status": "0"
            }
          ];
          return $q(function(resolve, reject){
             resolve(items);
          });
      }

    }

})();
