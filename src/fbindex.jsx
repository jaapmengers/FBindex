var SearchForm = React.createClass({
  handleChange: function(){
    var queryString = this.refs.query.getDOMNode().value.trim();
    this.props.onVideoSearch(queryString);
  },
  render: function() {
    return (
      <div className="section materialize-red lighten-2">
        <div className="container">
          <input type="text" autoFocus="true" ref="query" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
});

var SingleSearchResult = React.createClass({
  render: function() {
    return (
      <div className="card-panel">
        <div className="row">
          <div className="col s2">
            <img className="circle responsive-img" src={this.props.video.picture} />
          </div>
          <div className="col s10">
            <span className="card-title black-text">{this.props.video.title}</span>
            <p>{this.props.video.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

var SearchResults = React.createClass({
  render: function () {
    var videoNodes = this.props.videos.map(function(video){
      return (
        <SingleSearchResult video={video} key={video.id}></SingleSearchResult>
      )
    });

    return (
      <div className="section">
        <div className="container">
          {videoNodes}
        </div>
      </div>
    );
  }
});


var SearchComponent = React.createClass({
  doSearchQuery: function(queryString){
    var query = {
      "query": {
        "filtered": {
          "query": {
            "query_string": {
              "query": queryString
            }
          },
          "filter": {
            "query": {
              "match": {
                "link": "youtube"
              }
            }
          }
        }
      }
    };

    $.ajax({
      url :'http://' + window.server + ':' + window.port + '/links/link/_search?source=' + JSON.stringify(query),
      success: function(res){
        var videos = res.hits.hits.map(function (hit) {
          console.log(hit);
          return {id: hit._id, title: hit._source.name, description: hit._source.description, picture: hit._source.picture, youtubeID: getVideoIdFromUrl(hit._source.link)};
        }).filter(function(it){
          return it.youtubeID !== undefined;
        });

        this.setState({ videos: videos });
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {videos: []};
  },
  render: function() {
    return (
      <div>
        <SearchForm onVideoSearch={this.doSearchQuery} />
        <SearchResults videos={this.state.videos} />
      </div>
    );
  }
});


React.render(
  <SearchComponent />,
  document.getElementById('search')
);


/**
 * Some helper functions
 **/

function getUrlEncodedKey(key, query) {
  var re = new RegExp("[?|&|#]" + key + "=(.*?)&");
  var matches = re.exec(query + "&");
  if (!matches || matches.length < 2)
    return "";
  return decodeURIComponent(matches[1].replace("+", " "));
}

function getVideoIdFromUrl(url){
  var v = getUrlEncodedKey("v", url);
  if(!v){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
      return match[7];
    } else {
      // This should maybe throw, but returning undefined makes the calling code simpler
      return undefined;
    }
  } else return v;
}