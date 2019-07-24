export const UPDATE_PAGE = 'UPDATE_PAGE';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const UPDATE_SEGMENTS = 'UPDATE_SEGMENTS';

export const startLoading = () => {
  return {
    type: START_LOADING
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

export const navigate = (path) => dispatch => {
  const url = (path === '/') ? 'home' : path.slice(1);
  // separo segmentos
  const decodedUrl = decodeUrl(url);
  console.log(decodedUrl);
  dispatch(loadPage(decodedUrl.page));
  dispatch(loadSection(decodedUrl.page, decodedUrl.segments))
}

const loadSection = (page, segments) => (dispatch) => {
  let pageSection = '';
  let pageParameter = '';
  if(segments.length > 0) {
    pageSection = segments[0];
    if(page == 'headquarters') {
      switch(pageSection) {
        case 'madrid':
          import('../../headquarters/headquarters-madrid-view');
          break;
        case 'barcelona':
          import('../../headquarters/headquarters-barcelona-view');
          break
        default:
          dispatch(loadPage('404'));
      }
    }
  }
  if(segments.length > 1) {
    pageParameter = segments[1];
  }
  dispatch(updateSegments(pageSection, pageParameter));
}

const updateSegments = (pageSection, pageParameter) => {
  return {
    type: UPDATE_SEGMENTS,
    pageSection,
    pageParameter
  }
}

export const loadPage = (page) => (dispatch) => {

  switch(page) {
    case 'home':
      import('../../views/view-home.js');
      break;
    case 'about':
      import('../../views/view-about.js');
      break;
    case 'contact':
      import('../../views/view-contact.js');
      break;
    case 'map':
      import('../../views/view-map.js');
      break;
    case 'headquarters':
      import('../../views/view-headquarters.js');
      break;
    default: 
      import('../../views/view-404.js');
      page = '404';
      break;
  }
  dispatch(updatePage(page));
}

export const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  }
}

export const navigateDelay = (page) => (dispatch) => {
  dispatch(startLoading());
  setTimeout(() => {
    dispatch(stopLoading());
    dispatch(updatePage(page));
  }, 3000);
}

const decodeUrl = (url) => {
  const segments = url.split('/');
  const page = segments.shift();
  return {
    page,
    segments
  }
}
