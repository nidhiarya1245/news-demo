import { DebounceInput } from 'react-debounce-input';

function NewsSearch(props) {

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
      <div className="container-fluid">
        <div className="row w-100">
          <div className="offset-lg-3 col-lg-6 offset-md-4 col-md-8">
            <div className="collapse navbar-collapse" id="navbarScroll">
              <form className="w-100 me-3">
                <DebounceInput
                  minLength={2}
                  debounceTimeout={200}
                  id="search-news"
                  type="search"
                  autoComplete="off"
                  list="datalistOptions" className="form-control"
                  placeholder="Search News Here..." aria-label="Search News Here..." aria-describedby="basic-addon2"
                  value={props.searchNewsText} onChange={props.onSearchNews} />

                <datalist id="datalistOptions">
                  {
                    props.newsList.map(
                      (item, index) => (<option value={item.title} key={index} />)
                    )
                  }
                </datalist>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NewsSearch;