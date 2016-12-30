var app = angular.module('dashboardConfigApp',
    ['ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.cellNav','ui.grid.resizeColumns', 'ui.grid.moveColumns','toastr', 'ui.select', 'ui.grid.pagination','common'])
    .controller('maintainDashboardConfigCtrl', ['$scope', '$http','toastr','utils', function ($scope, $http, toastr,utils) {
        $scope.config = {
            sysName:''
            // Name:'',
            // createUser: '',
            // updateUser: '',

        };

        $scope.externalSystems = [];
        $http.post('/support/externalSystem').success(function(data){
            $scope.externalSystems = data;
        });

        // $scope.users = [];
        // $http.post('/support/user').success(function(data){
        //     $scope.users = data;
        // });

        // $scope.createUserNames = [];
        // $http.post('/support/createUserName').success(function(data){
        //     $scope.createUserNames = data;
        // });
        // $scope.createUserNames = [];
        // $http.post('/support/createUser').success(function(data){
        //     $scope.createUserNames = data;
        // });

        // $scope.updateUserNames = [];
        // $http.post('/support/updateUserName').success(function(data){
        //     $scope.updateUserNames = data;
        // });

        // $scope.updateUserNames = [];
        // $http.post('/support/updateUser').success(function(data){
        //     $scope.updateUserNames = data;
        // });

        // $scope.activeStatuses = [];
        // $http.post('/support/activeStatus').success(function (data) {
        //    $scope.activeStatuses = data;
        // });





        $scope.grid ={
            enableColumnResizing: true,
            enableGridMenu: true,
            autoResize:true,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            paginationOptions: {
                pageSize: 20,
                pageNumber: 1
            },
            useExternalPagination: true,
            paginationTemplate : '/views/gridPagination.html',
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    $scope.grid.paginationOptions.pageNumber = newPage;
                    $scope.grid.paginationOptions.pageSize = pageSize;
                    getDashboardConfigs();
                });
            },
            columnDefs: [
                {
                    name: 'externalSystemName', enableCellEdit: true, displayName: '应用系统',
                },
                {
                    name: 'reportName', enableCellEdit: true, displayName: 'Dashboard名称',
                    cellTemplate:"<div class='ui-grid-cell-contents' title='TOOLTIP'>"
                    +   "<a href='/dashboardConfig/edit?id={{row.entity._id CUSTOM_FILTERS}}' target='_blank'><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></a>"
                    +   "</div>"
                },
                {
                    name: 'createUser', enableCellEdit: true, displayName: '创建人',
                },
                {
                    name: 'updateUser', enableCellEdit: true, displayName: '更新人',
                },
                {
                    name: 'updateDate', enableCellEdit: true, displayName: '更新时间',
                    cellTemplate:'<div class="ui-grid-cell-contents" title="TOOLTIP"><span ng-cell-text>{{COL_FIELD | date:"yyyy-MM-dd HH:mm:ss" }}</span></div>'
                },
                {
                    name: 'directURL', enableCellEdit: true, displayName: '直接访问',
                    cellTemplate:"<div class='ui-grid-cell-contents' title='TOOLTIP'>"
                    +   "<a href='/previewReport?id={{row.entity._id CUSTOM_FILTERS}}'  target='_blank'><span ng-cell-text>预览</span></a>"
                    +   "</div>"
                },
                {
                    name: 'active', enableCellEdit: true, displayName: '激活状态',
                    cellTemplate: "<div class='ui-grid-cell-contents' title='TOOLTIP'>{{col.colDef.expre(grid, row, col, value)}}</div>",
                // {{col.colDef.expre(row, col)}}
                    expre:function(grid, row, col, value){
                        // var vl = col.active.value;
                        // var vl = col.colDef.value;
                        var vl = row.entity.active;
                        // var status = $scope.active;
                        // var vl = row.entity[col.colDef.field];
                        // var status = row.entity[col.colDef.active];
                        // console.log(vl);
                        // var vl = COL_FIELD;
                        if(vl){
                            return "激活";
                        // }
                        } else {
                            return "未激活";
                        }
                    },
                }
            ]
        };

        $scope.submitForm = function(ngFormController) {
            console.log($scope.config);
            getDashboardConfigs();
        }



        
// var app2 = angular.module('dashboardConfigApp', ['ngSanitize', 'ui.select']);

app.filter('propsFilter', function(){
    return function (items, props) {
        var out = [];
        if(angular.isArray(items)){
            items.forEach(function (item) {
                var itemMatches = false;
                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++){
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1){
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            out = items;
        }
        return out;
    }
});

app.controller('DemoCtrl', function ($scope,$http) {
    // $scope.disable = undefined;
    // $scope.enable = function(){
    //     $scope.disabled = false;
    // };
    // $scope.clear = function(){
    //     $scope.createUserNames.selected = undefined;
    // };

    $scope.createUserNames = [];
    $http.post('/support/createUser').success(function(data){
        $scope.createUserNames = data;
    });

    $scope.updateUserNames = [];
    $http.post('/support/updateUser').success(function(data){
        $scope.updateUserNames = data;
    });
});

app.controller('SelectDropdown',["$scope", function ($scope) {
    $scope.activities =
        [
            { id: 1, name: "全部状态"},
            { id: 2, name: "激活", value: true},
            { id: 3, name: "未激活", value: false}
        ];
    }]);