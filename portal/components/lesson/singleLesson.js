apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server, $location) {

        console.log(JSON.stringify($stateParams));

        $scope.lessonId = $stateParams.lessonId;
        $scope.lessonNum = $stateParams.lessonNum;
        $scope.courseid = $rootScope.courseid;


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


        $scope.getAttendanceStatuses = function () {
            var data = {};
            server.requestPhp(data, 'GetAttendanceStatuses').then(function (data) {
                $scope.statuses = data;
                //console.log("attendance statuses: " + JSON.stringify($scope.statuses));
            });
        }
        $scope.getAttendanceStatuses();


        $scope.goBackToCourse = function () {
            // window.history.back();
            $state.go('singleCourse', { courseId: $scope.courseid })
        }


        $scope.updateAttendanceStatusInLesson = function (participant) {
            var data = {};
            data.student = participant;
            data.lessonid = $stateParams.lessonId; // doesn't accept  $scope.lessonId  !
            if (data.student.checkstudentid == null) {
                server.requestPhp(data, 'AddCheckStudentStatus').then(function (data) {
                    if (data.error != null) {
                        alert(data.error);
                    } else {
                        console.log("Change in attendance has been saved.");
                    }
                });
            } else {
                server.requestPhp(data, 'UpdateCheckStudentStatus').then(function (data) { });
            }
        }
    }
]);