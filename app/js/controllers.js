'use strict';

/* Controllers */

angular.module('BreakEven.controllers', [])
	.controller('Main', ["$scope", function($scope) {
		
		$scope.visits = [];
		$scope.dpvs = [];
		
		$scope.compute = function(){
			if (
				$scope.lVisits && !isNaN($scope.lVisits) &&
				$scope.hVisits && !isNaN($scope.hVisits) &&
				$scope.ppvl && !isNaN($scope.ppvl) &&
				$scope.ppvh && !isNaN($scope.ppvh) &&
				$scope.vpm && !isNaN($scope.vpm) &&
				$scope.amount && !isNaN($scope.amount)
			) {
				//calculate the x axis
				var	val = ($scope.ppvh-$scope.ppvl)/4,
					current = $scope.ppvl*1,
					a, len=3;
					
				$scope.dpvs = [];
				$scope.dpvs.push({"val":$scope.ppvl*1});
				for (a = 0; a < len; a++) {
					current += val;
					$scope.dpvs.push({"val":current});
				}
				$scope.dpvs.push({"val":$scope.ppvh*1});
				
				//calculate the y axis
				len = ($scope.hVisits - $scope.lVisits >= 30) ? 28 : $scope.hVisits - $scope.lVisits - 2,
				val = ($scope.hVisits-$scope.lVisits)/(len+1),
				current = $scope.lVisits*1;
				
				$scope.visits = [];
				$scope.visits.push({
					"num": parseInt($scope.lVisits*1),
					"v1": getValue(0,$scope.lVisits*1),
					"v2": getValue(1,$scope.lVisits*1),
					"v3": getValue(2,$scope.lVisits*1),
					"v4": getValue(3,$scope.lVisits*1),
					"v5": getValue(4,$scope.lVisits*1)
				});
				console.log("val",val);
				for (a = 0; a < len; a++) {
					current += val;
					$scope.visits.push({
						"num": Math.round(current),
						"v1": getValue(0,current),
						"v2": getValue(1,current),
						"v3": getValue(2,current),
						"v4": getValue(3,current),
						"v5": getValue(4,current)
					});
				}
				$scope.visits.push({
					"num": parseInt($scope.hVisits,10),
					"v1": getValue(0,$scope.hVisits*1),
					"v2": getValue(1,$scope.hVisits*1),
					"v3": getValue(2,$scope.hVisits*1),
					"v4": getValue(3,$scope.hVisits*1),
					"v5": getValue(4,$scope.hVisits*1)
				});
			}
		};
		
		function getValue(index, value) {
			var v = $scope.dpvs[index].val,
				amt = $scope.amount*1;
			
			return (v*value)-amt;
		}
	}]);