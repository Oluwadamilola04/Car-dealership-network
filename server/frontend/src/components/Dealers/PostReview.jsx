import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import "../../App.css";


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let params = useParams();
  let id =params.id;
  let review_url = `/djangoapp/add_review`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split("|");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/dealer/"+id;
  }

  }
  const get_dealer = useCallback(async ()=>{
    const res = await fetch(`/djangoapp/dealer/${id}`, {
      method: "GET"
    });
    const retobj = await res.json();

    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if(dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }, [id]);

  const get_cars = useCallback(async ()=>{
    const res = await fetch(`/djangoapp/get_cars`, {
      method: "GET"
    });
    const retobj = await res.json();

    let carmodelsarr = Array.from(retobj.CarModels || [])
    setCarmodels(carmodelsarr)
  }, []);

  useEffect(() => {
    get_dealer();
    get_cars();
  }, [get_dealer, get_cars]);


  return (
    <div className="app-shell">
      <Header/>
      <main className="content-page">
        <section className="content-hero">
          <p className="eyebrow dark">Post Review</p>
          <h1>{dealer.full_name || "Dealership review"}</h1>
          <p>Share your purchase experience and choose the car make and model attached to your review.</p>
        </section>
        <section className="review-form">
          <label htmlFor="review">Review</label>
          <textarea id='review' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>

          <label htmlFor="purchase-date">Purchase Date</label>
          <input id="purchase-date" type="date" onChange={(e) => setDate(e.target.value)}/>

          <label htmlFor="cars">Car Make and Model</label>
          <select name="cars" id="cars" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled>Choose Car Make and Model</option>
            {carmodels.map(carmodel => (
              <option key={`${carmodel.CarMake}-${carmodel.CarModel}`} value={`${carmodel.CarMake}|${carmodel.CarModel}`}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>

          <label htmlFor="car-year">Car Year</label>
          <input id="car-year" type="number" onChange={(e) => setYear(e.target.value)} max={2026} min={2015}/>

          <button className='button button-primary postreview' onClick={postreview}>Post Review</button>
        </section>
      </main>
      </div>
  )
}
export default PostReview
