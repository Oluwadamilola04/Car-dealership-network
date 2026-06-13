import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import "../../App.css";
import positiveIcon from "../assets/positive.png"
import neutralIcon from "../assets/neutral.png"
import negativeIcon from "../assets/negative.png"
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let params = useParams();
  let id = params.id;

  const getDealer = useCallback(async () => {
    const res = await fetch(`/djangoapp/dealer/${id}`);
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer || []);
      setDealer(dealerobjs[0] || null);
    }
  }, [id]);

  const getReviews = useCallback(async () => {
    const res = await fetch(`/djangoapp/reviews/dealer/${id}`);
    const retobj = await res.json();

    if (retobj.status === 200) {
      setReviews(Array.from(retobj.reviews || []));
    }
  }, [id]);

  const sentimentIcon = (sentiment) => {
    if (sentiment === "positive") return positiveIcon;
    if (sentiment === "negative") return negativeIcon;
    return neutralIcon;
  }

  useEffect(() => {
    const loadDealer = async () => {
      setLoading(true);
      setError("");

      try {
        await Promise.all([getDealer(), getReviews()]);
      } catch (err) {
        console.error(err);
        setError("We could not load this dealership. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDealer();
  }, [getDealer, getReviews]);

  return (
    <div className="app-shell">
      <Header/>
      <main className="dealer-detail-page">
        {loading ? (
          <div className="empty-state">Loading dealership...</div>
        ) : error ? (
          <div className="notice notice-error">{error}</div>
        ) : !dealer ? (
          <div className="empty-state">Dealership not found.</div>
        ) : (
          <>
            <section className="dealer-hero">
              <div>
                <p className="eyebrow dark">Dealer profile</p>
                <h1>{dealer.full_name}</h1>
                <p>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>
              </div>
              <a href={`/postreview/${id}`} className="button button-primary">Write a Review</a>
            </section>

            <section className="review-section">
              <div className="section-title">
                <h2>Customer Reviews</h2>
                <span>{reviews.length} total</span>
              </div>

              {reviews.length === 0 ? (
                <div className="empty-state">No reviews yet. Be the first to write one.</div>
              ) : (
                <div className="reviews-grid">
                  {reviews.map(review => (
                    <article className="review-card" key={review.id || `${review.name}-${review.purchase_date}`}>
                      <img src={sentimentIcon(review.sentiment)} className="review-sentiment" alt={`${review.sentiment || "neutral"} sentiment`}/>
                      <p>{review.review}</p>
                      <footer>
                        <strong>{review.name}</strong>
                        <span>{review.car_make} {review.car_model} {review.car_year}</span>
                      </footer>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default Dealer
