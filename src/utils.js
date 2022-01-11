async function fetchFeeds ({ $content, feedConfig, pageTree }) {
  let allFeeds = {};
  for (let key of Object.keys(feedConfig)) {
    const conf = feedConfig[key];
    allFeeds[key] = $content(conf.dir).sortBy(conf.sortBy).where(conf.where).limit(conf.limit);
  }

  const myFeedKeys = Object.keys(allFeeds).filter(key => pageTree[key]);
  const myFeedValues = await Promise.all(Object.entries(allFeeds).filter(o => pageTree[o[0]]).map(o => o[1].fetch()));
  
  let myFeeds = {};
  for (var i = 0; i < myFeedKeys.length; ++i) {
    myFeeds[myFeedKeys[i]] = myFeedValues[i].body;
  }

  return myFeeds;
}

function commonComputed () {
  return {
    now: () => new Date(),
  }
}

export { fetchFeeds, commonComputed }



