apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server, $location) {

        console.log(JSON.stringify($stateParams));

        $scope.lessonId = $stateParams.lessonNum;
        $scope.lessonNum = $stateParams.lessonId;
        $scope.courseid = $rootScope.courseid;
        console.log("Course ID: " + $scope.courseid);
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
            // var lessonid = $scope.lessonId;
            // if (participant.checkstudentid == null) {
            //     addCheckStudentStatus(participant, lessonid);
            // } else {
                updateStudentStatus(participant);
            // }
        }


        function updateStudentStatus(student) {
            var data = {};
            data.id = student.userid;
            data.attendanceStatus = student.attendanceStatus;
            server.requestPhp(data, 'UpdateCheckStudentStatus').then(function (data) { });
        }

    }
]);