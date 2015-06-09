var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('expect');
var {Rating, RatingIcon} = require('../');

describe('Rating', function() {

  it('should render 5 RatingIcons as default', function() {
    var ratingWrapper = TestUtils.renderIntoDocument(
      <div>
        <Rating onRate={() => {}} />
      </div>
    );

    var ratingIcons = TestUtils.scryRenderedComponentsWithType(ratingWrapper, RatingIcon);
    expect(ratingIcons.length).toBe(5, 'Rating is not rendering 5 icons as default');
  });

  it('should render 3 RatingIcons', function() {
    var ratingWrapper = TestUtils.renderIntoDocument(
      <div>
        <Rating onRate={() => {}} maxRating={3} />
      </div>
    );

    var ratingIcons = TestUtils.scryRenderedComponentsWithType(ratingWrapper, RatingIcon);
    expect(ratingIcons.length).toBe(3, 'Rating is not renderin 3 icons');
  });

});
