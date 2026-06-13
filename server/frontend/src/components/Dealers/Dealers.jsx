import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import "../../App.css";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filterDealers = async (state) => {
    setSelectedState(state);
    setLoading(true);
    setError("");

    try {
      let dealerUrl = state === "All" ? "/djangoapp/get_dealers" : `/djangoapp/get_dealers/${state}`;
      const res = await fetch(dealerUrl);
      const retobj = await res.json();

      if (retobj.status === 200) {
        setDealersList(Array.from(retobj.dealers || []));
      } else {
        setError("Failed to fetch dealers. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const getDealers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/djangoapp/get_dealers");
      const retobj = await res.json();

      if (retobj.status === 200) {
        let allDealers = Array.from(retobj.dealers || []);
        let stateSet = new Set();
        allDealers.forEach((dealer) => {
          if (dealer.state) {
            stateSet.add(dealer.state);
          }
        });

        setStates(Array.from(stateSet).sort());
        setDealersList(allDealers);
      } else {
        setError("Failed to fetch dealers. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDealers();
  }, []);

  let isLoggedIn = sessionStorage.getItem("username") != null;

  return (
    <div className="app-shell">
      <Header/>

      <main className="dealers-page">
        <section className="page-heading">
          <div>
            <p className="eyebrow dark">Dealer directory</p>
            <h1>Our Dealerships</h1>
            <p>Compare locations, open dealer profiles, and post reviews from one clean dashboard.</p>
          </div>
          <div className="filter-panel">
            <label htmlFor="state">Filter by State</label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => filterDealers(e.target.value)}
            >
              <option value="All">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </section>

        {error && (
          <div className="notice notice-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <p>Loading dealerships...</p>
          </div>
        ) : dealersList.length === 0 ? (
          <div className="empty-state">
            <p>No dealerships found. Please try a different filter.</p>
          </div>
        ) : (
          <div className="dealer-grid">
            {dealersList.map(dealer => (
              <article key={dealer.id} className="dealer-card">
                <div className="dealer-card-top">
                  <span className="dealer-id">#{dealer.id}</span>
                  <span className="dealer-state">{dealer.state}</span>
                </div>

                <h2>
                  <a href={`/dealer/${dealer.id}`}>
                    {dealer.full_name}
                  </a>
                </h2>
                <p className="dealer-short-name">{dealer.short_name}</p>

                <dl className="dealer-details">
                  <div>
                    <dt>City</dt>
                    <dd>{dealer.city}</dd>
                  </div>
                  <div>
                    <dt>Zip</dt>
                    <dd>{dealer.zip}</dd>
                  </div>
                  <div className="full-row">
                    <dt>Address</dt>
                    <dd>{dealer.address}</dd>
                  </div>
                </dl>

                <div className="card-actions">
                  <a href={`/dealer/${dealer.id}`} className="button button-primary">
                    View Details
                  </a>
                  {isLoggedIn && (
                    <a href={`/postreview/${dealer.id}`} className="button button-secondary">
                      Post Review
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dealers;
