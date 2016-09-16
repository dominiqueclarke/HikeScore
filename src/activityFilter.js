angular.module('HikeScore')
.filter('byActivity', function() {
  return function (activities, types) {
      console.log(activities);
      console.log(types);
      var items = {
          types: types,
          out: []
      };
      angular.forEach(activities, function (value, key) {
          if (this.types[value.type] === true) {
              this.out.push(value);
          }
      }, items);
      return items.out;
  };
});
