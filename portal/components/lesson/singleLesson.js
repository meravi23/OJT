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

        function getStudentsAttendanceStatus() {
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
        getStudentsAttendanceStatus();

        $scope.addendanceStatuses = [
            {
                code: "0",
                desc: "נכח/ה"
            },
            {
                code: "1",
                desc: "איחר/ה"
            }
        ]
        
        $scope.UpdateParticipantStatus =  function(participant, lessonid){

        }
        
        
        // $scope.setAttendanceStatus = function(student, status) {
        //     student.attendanceStatus = status;
        // };


    }
]);