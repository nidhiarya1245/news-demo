import { useState, useEffect, useRef, useCallback } from "react";
import { useAlert } from "react-alert"; //display alert messages

import Truncate from "react-truncate";
import ReactLoading from "react-loading";
import NewsSearch from "./NewsSearch.jsx";
import { NEWS_SEARCH_API, LATEST_NEWS_API } from "../constants";

import "./News.css";

function News() {
  const alert = useAlert();

  const [searchNewsText, updateSearchNews] = useState("");
  const [newsList, updateNewsList] = useState([]);
  const [isLoading, updateIsLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [loadedPage, updateLoadedPage] = useState(0);
  const [maxPages, updateMaxPages] = useState(10);
  const newsListContainer = useRef(null);

  const getNews = useCallback(
    async () => {

      if (currentPage === loadedPage) return;

      await updateIsLoading(true);

      let apiUrl = LATEST_NEWS_API;
      let queryParams = ["pageNumber=" + currentPage];

      if (searchNewsText && searchNewsText.length >= 1) {
        queryParams.push(["searchTerm=" + searchNewsText]);
        apiUrl = NEWS_SEARCH_API;
      }

      apiUrl += "?" + queryParams.join("&");

      try {
        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
          throw apiResponse;
        }

        const response = await apiResponse.json();
        const { pageNumber, articles, totalResults } = response;

        if (loadedPage === parseInt(pageNumber) - 1) {
          await updateNewsList([...newsList, ...articles]);
          await updateIsLoading(false);
          await updateLoadedPage(parseInt(pageNumber));
          const possibleMaxPages = Math.ceil(totalResults / 10);

          if (possibleMaxPages < maxPages) {
            await updateMaxPages(possibleMaxPages);
          }

        }
        
      } catch (err) {
        alert.show("Api Fail: " + err.statusText);
        await updateIsLoading(false);
        console.log("Api Fail: ", err.statusText);
      }
    }, [
    updateIsLoading,
    updateNewsList,
    currentPage,
    newsList,
    loadedPage,
    updateLoadedPage,
    alert,
    searchNewsText,
    maxPages,
    updateMaxPages,
  ]);

  useEffect(() => {
    if (isLoading || currentPage === loadedPage) return;
    
    if (newsList.length === 0) getNews();
  }, [getNews, newsList, isLoading, currentPage, loadedPage]);

  useEffect(() => {
    const onScroll = () => {

      if (
        newsListContainer.current &&
        newsListContainer.current.getBoundingClientRect().bottom - 150 <= window.innerHeight &&
        !isLoading &&
        currentPage <= maxPages
      ) {
        updateCurrentPage(currentPage + 1);
        getNews();
      }
    }

    window.addEventListener("scroll", onScroll, false);

    return () => {
      window.removeEventListener("scroll", onScroll, false);
    }
  }, [getNews, updateCurrentPage, currentPage, isLoading, maxPages]);

  const onSearchNews = async (e) => {
    await updateMaxPages(10);
    await updateCurrentPage(1);
    await updateLoadedPage(0);
    await updateSearchNews(e.target.value);
    await updateNewsList([]);
    getNews();
  }

  function getFormatedDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <>
      <div className="container" id="news-list-page">
        <NewsSearch
          searchNews={searchNewsText}
          onSearchNews={onSearchNews}
          newsList={newsList.slice(0, 10)}
        />
        <div className="row mb-2" ref={newsListContainer}>
          {newsList.map((news, index) => (
            <div className="col-md-6" key={index}>
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-8 p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">
                    <Truncate lines={1} ellipsis={<span>...</span>}>
                      {news.author}
                    </Truncate>
                  </strong>
                  <h3 className="mb-0">
                    <Truncate lines={1} ellipsis={<span>...</span>}>
                      {news.title}
                    </Truncate>
                  </h3>
                  <div className="mb-1 text-muted">
                    {getFormatedDate(news.publishedAt)}
                  </div>
                  <p className="card-text mb-auto">
                    <Truncate lines={2} ellipsis={<span>...</span>}>
                      {news.description}
                    </Truncate>
                  </p>
                  <a
                    href={news.url}
                    className="stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Continue reading
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  {!news.urlToImage ? (
                    <svg
                      className="bd-placeholder-img"
                      width="220"
                      height="213"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Image not available"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                        Image not available
                      </text>
                    </svg>
                  ) : (
                      <img
                        src={news.urlToImage}
                        alt="News"
                        className="newsImage"
                      />
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center m-3">
          {isLoading ? (
            <ReactLoading type="bars" color="grey" />
          ) : (
              <div className="offset-md-4 col-md-4">
                <span className="text-muted">All caught up</span>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default News;
