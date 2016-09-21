angular.module('HikeScore')
.controller('resultsCtrl', function($scope, $stateParams, $state, trailsService){
    $scope.rating = $stateParams.rating;
    $scope.zip = $stateParams.zip;
    $scope.geoData = $stateParams.geoData;
    $scope.city = $stateParams.geoData.address;
    $scope.places = $stateParams.places;
    $scope.activities = $stateParams.activities;
    console.log($scope.places);
    $scope.stateRef = $stateParams.stateRef;
    $scope.filterActivity = function(activity) {
        $scope.activityFilter = activity;
    };
    $scope.createRatingRepeat = trailsService.createRatingRepeat;

    function getGeoCoordinates() {
        console.log('this is working');
        var locationsObj = {};
        locationsObj.type = "geojson";
        locationsObj.data = {
            "type": "FeatureCollection",
            "features": []
        };
        //console.log($scope.places);
        //console.log($stateParams.places);
        for(var place in $scope.places) {
            console.log(place);
            if ($scope.places[place].display) {
                var pointObj = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [$scope.places[place].lon, $scope.places[place].lat]
                    },
                    "properties": {
                        "title": $scope.places[place].name,
                        "img": '<img style="height:100px; width:100px" src="' + $scope.places[place].activities[0].thumbnail + '" />',
                        "id": $scope.places[place].unique_id,
                        "iconSize": [40, 40]
                    }
                }
                locationsObj.data.features.push(pointObj);
            }
        };
        return locationsObj;
    }
    // for(var place in places) {
    //     console.log(place);
    //     if (places[place].display) {
    //         var pointObj = {
    //             "type": "Feature",
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": [places[place].lon, places[place].lat]
    //             },
    //             "properties": {
    //                 "title": places[place].name,
    //                 "img": '<img style="height:100px; width:100px" src="' + places[place].activities[0].thumbnail + '" />',
    //                 "id": places[place].unique_id,
    //             }
    //         }
    //         locationsObj.data.features.push(pointObj);
    //     }
    // };
    // return locationsObj;
});
