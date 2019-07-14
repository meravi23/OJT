apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {

        console.log(JSON.stringify($stateParams));
        
        $scope.lessonId = $stateParams.lessonNum;
        $scope.lessonNum = $stateParams.lessonId;

        console.log("lesson number: " + $scope.lessonId);
        console.log("lesson ID: " + $scope.lessonNum);


        
        $scope.getLessonById = function () {
            var data = {};
            data.lessonid = $scope.lessonId;
            console.log(JSON.stringify(data));
            server.requestPhp(data, "GetLessonById").then(function (data) {
                $scope.lessonId = data.lessonid;
            });
        };

        $scope.getLessonById();

        $scope.participants = [];
        function getParticipants() {
            var data = {};
            data.lessonid = $scope.lessonId;
            server.requestPhp(data, "GetStudentsAttendance").then(function (data) {
                $scope.participants = data;
                console.log(JSON.stringify(data));
                /*
                    0 - attending
                    1 - late
                    2 - not attending
                    3 - hasn't reported yet
                */
            });
        }
        getParticipants();


        function getAttendanceStatuses() {
            var data = {};
            server.requestPhp(data, 'GetAttendanceStatuses').then(function(data) {
                $scope.statuses = data;
                console.log("attendance statuses: " + JSON.stringify($scope.statuses));
            });
        }

        getAttendanceStatuses();
        
        



        // $scope.addendanceStatuses = [
        //     {
        //         code: "0",
        //         desc: "נכח/ה"
        //     },
        //     {
        //         code: "1",
        //         desc: "איחר/ה"
        //     },
        //     {
        //         code: "2",
        //         desc: "לא נכח/ה"
        //     },
        //     {
        //         code: "3",
        //         desc: "טרם דיווח/ה"
        //     }
        // ]
        
        $scope.UpdateParticipantStatus =  function(participant, lessonid){

        }
        
          


    }
]);