apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {
        $scope.participants = [{
                fname: "מרב",
                lname: "מילר",
                attending: "true"
            },
            {
                fname: "יאיר",
                lname: "כרמל",
                attending: "true"
            },
            {
                fname: "שרון",
                lname: "כוכבי",
                attending: "false"
            },
        ]

        // $scope.getLessonById = function () {
		// 	var data = {};
		// 	data.lessonid = $scope.lessonId;
		// 	server.requestPhp(data, "GetLessonById").then(function (data) {
		// 		$scope.lesson = data.lesson;
        //         console.log($scope.lesson);
		// 	});
		// };

    }
]);